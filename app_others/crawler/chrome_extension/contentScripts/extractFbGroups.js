$(document).ready(function(){

	var CRAWL_MAX_WAIT_TIME = 2;
	var CRAWL_MAX_WAIT_NUM = 3; // Number of time waiting new data being fetched.
	// var CRAWL_MAX_SCROLL_NUM = 3;
	var CRAWL_MAX_SCROLL_NUM = 1; // For testing	
	// var CRAWL_MAX_SCROLL_TIME = 20000; // millisecond
	var CRAWL_MAX_SCROLL_TIME = 2000; // For testing
	var CRAWL_DATA_WAIT_TIME = 3000;
	var CRAWL_MAX_POST_NUM = 1000; 
	var CRAWL_CLOSE_WINDOW = false;
	var CRAWL_SCROLL_JUMP = 1;
	var CRAWL_CURRENT_TIME = new Date ();
	var CRAWL_LAST_TIME = 0;

	var DOM_IDS = {
		/*
		ids, classes, or pattern of ids or classes of elements in the page
		*/
		postList: {id: 'pagelet_group_mall'},
		post: {idPattern: 'mall_post_'},
	} 


	running (CRAWL_CLOSE_WINDOW);

	function running (closeWindow){
		var port = chrome.runtime.connect({name: "content_state"});
		port.postMessage({content_state: 1});
		port.onMessage.addListener(function(msg) {
			if (msg.action == 1){
				updateConstants (msg.constants);
				extractData ()
					.then (function success (data){
						port.postMessage({extract_status: 1, data: data});
						if (closeWindow){
							window.close ();
						}
					})
					.catch (function error (err){
						cosole.log ('Cannot extracting. Something goes wrong ...')
						console.log (err);
						port.postMessage({error: err});
					})
			}
		});	
	};

	function updateConstants (constants){
		CRAWL_LAST_TIME = constants.CRAWL_LAST_TIME;
	}

	function _extract_profile_path (ele){
		/*
		Extract id, nameid, and profile path.
		Not all user has nameid, but always has id.

		*/
		var href = ele.getAttribute ('href');
		var hovercard_path = ele.getAttribute ('data-hovercard');
		var id = '';
		var nameid = '';
		var profile_path = '';
		var messenger_path = '';
		if (href.indexOf ('profile.php') == -1){
			var qmark = href.indexOf ('?');
			profile_path = href.slice (0, qmark);
			var _temp = profile_path.split ('/');
			nameid = _temp [_temp.length - 1];
		}
		else{
			var qmark = href.indexOf ('?');
			var _temp_params = href.slice (qmark + 1).split ('&');
			var idfound = false;
			for (var i=0; i < _temp_params.length; i++){
				if (idfound == true) {
					break;
				}
				var param = _temp_params[i].split ('=');
				if (param[0] == 'id'){
					id = param[1];
					profile_path = href.slice (0, qmark + 1) + 'id=' + id;
					idfound = true;
				}	
			}	
		}

		if (!id && hovercard_path){
			if (hovercard_path.indexOf ('user.php') != -1 || hovercard_path.indexOf ('hovercard.php') != -1){
				var qmark = hovercard_path.indexOf ('?');
				var _temp_params = hovercard_path.slice (qmark + 1).split ('&');
				var idfound = false;
				for (var i=0; i < _temp_params.length; i++){
					if (idfound == true) {
						break;
					}
					var param = _temp_params[i].split ('=');
					if (param[0] == 'id'){
						id = param[1];
						idfound = true;
					}					
				}
			}
		}
		else if (!id && !hovercard_path){
			console.log (ele)
			throw "Not found both id and hovercard_path. Should not process the element!";
		}

		messenger_path = 'https://www.messenger.com/t/' + id;
		return [id, nameid, profile_path, messenger_path];
	}

	function _extract_authorid (ele){
	}

	function _extract_author (ele){
		/*
		Things about the author are needed to extracted:
			- user id
			- photo

		Approach to obtain user profile and posting time.
			- Get the firsr userContent div, its previous sibling is the one contains profile information
			- Get all `a` elements.
			- `a` element with image is the ava. get href of the a and src of its image. 
			Within the image, the attribute `aria-label` contains the name of the user.
			- There is one `a` that contain posting time. The one contains element 'abbr', which contain the posting time. Get the attribute `data-utime`. Convert to normal time by the following:
			a = new Date (0); a.setUTCSeconds(utime); 
			Not that no need to convert utime to number. String still ok.
			The `abbr` could be obtained by call the property `children` of the a. Or search with `getElementsByTagName`.
			Better keep it as utime. And convert to normal when needed.

		::param ele:: DOM element of the posting.
		::vararible id:: id number of a user
		::variable nameid:: id name or nick name of a user. A user often has both id and nameid.

		*/

		var userContents = ele.getElementsByClassName ('userContent');
		var authorEle = userContents[0].previousSibling;
		var links = authorEle.getElementsByTagName ('a');
		var lnum = links.length;
		var avatar = '';
		var fullname = '';
		var postingTime = '';
		var profile_path = '';
		var messenger_path = '';
		var id = '';
		var nameid = '';

		for (var i = 0; i < lnum; i++){
			var x = links[i];
			var img = x.getElementsByTagName ('img');
			var abbr = x.getElementsByTagName ('abbr');
			if (img.length && !id && !nameid && !profile_path){
				avatar = img[0].src;
				fullname = img[0].getAttribute ('aria-label');
				result = _extract_profile_path (x);
				messenger_path = result[3];
				profile_path = result[2];
				nameid = result[1];
				id = result [0];
			}
			if (abbr.length){
				postingTime = abbr[0].getAttribute ('data-utime');
			}
		}

		return {profile_path: profile_path, id: id, nameid: nameid, fullname: fullname, avatar: avatar, messenger_path: messenger_path, postingTime: postingTime}
	}

	function _extract_content_img (imgSection){
		var imgs = [];
		var imgList = imgSection.getElementsByTagName ('img');
		for (var i = 0; i < imgList.length; i++){
			var img = {};
			img['src'] = imgList[i].getAttribute ('src');
			img['alt'] = imgList[i].getAttribute ('alt');
			imgs.push (img);	
		}

		return imgs;
	}

	function _extract_content_text (textSection){
		var contents = '';
		var textWrapper = textSection.getElementsByClassName ('text_exposed_root')[0];
		if (!textWrapper){
			textWrapper = textSection;
		}
		contents = textWrapper.innerHTML;
		return contents;
	}

	function _extract_content (ele){
		/*
		There exist normal post and special posts, which include header that specifies price and location.

		The wrapper of all contents within a post has a class called "userContentWrapper". It contain both post content and comments. Normally, content and comment are placed into differen divs , which are siblings.

		Note about the contents needed to extracted:
			May be more than one contents like text, photo, link, and share of other post. 
			+ user content		
				- The wrapper class is "userContent". Below the class, and still contain all content is class "text_exposed_root". 
				- header: for some special type of posts like a "sell and buy" post. If the header exits, the normal userContent class is empty, and the user content is often put into a class "mtm". If exist other content like share, link, or photo, each are put into the other class "mtm". Note that there still exits another "userContent" that contains the content, but not the header, and the content and the header are their sibling. So far, I observered only posts with one user content and one or zero other type of content, and thus exits only two class "mtm".
				- Without header, the "userContent" is between user profile and the other content like a photo, a link, or a shared post.  
				- Contain complicate structure of html tags, not just text. 
				- Within class "text_exposed_root", for long text, the some part is exposed. Other is hidden and is store in different element, whose class is name "text_exposed_hide".
			+ photo: 
				- 
				- If have only photo and user content, they are often put into a 
				- keep them but put in seperate from user content for later processing.
			+ Link: Found in second class "mtm"
			+ Shared post: 
				- The content within the shared is pretty complicated, and so far I see they DO NOT follow the structure about the user content above.
				- << NOTICE >> Should collect but add a status of not showing the posts until having a good treatment for them.

		Approach for normal post (or content):
			+ get the element "userContent". Normally only exist one userContent. 
			+ determine it is a normal post or special post.
			+ with a normal post, just pick two sibling above and below the userContent. Pretty sure the first is about the author, and the other is photo, link, or shared post.


		Approach for special post (sell-buy):		
			+ get element by class "userContent". Normally exists two userContent divs.
			+ if the first one has textContent empty, and the other is not, then we know that this is the special posts.
			+ Now get element "mtm". The first one contains userContent. Now fetch the userContent. It previous sibling is the header. 
			+ Not fetch the second "mtm", which often a link, a photo, or maybe a post.

		Approach to deal with sharing posts.
			+ Ignore the shared post in a post. But still keep the content if exist.

		*/
		var userContents = ele.getElementsByClassName ('userContent');
		var img = '';
		var contents = '';
		if (userContents.length > 1 && !userContents[0].textContent && userContents[1].textContent){
			var contentWrapper = userContents[0].nextSibling.getElementsByClassName ('mtm'); 
			if (contentWrapper.length > 1){
				var imgSection = contentWrapper[1];
				img = _extract_content_img (imgSection);
			}
			var textSection = userContents[1];
			contents = _extract_content_text (textSection);
		}
		else if (userContents.length == 1 && userContents[0].textContent){
			var textSection = userContents[0];
			var imgSection = textSection.previousSibling;
			img = _extract_content_img (imgSection);
			contents = _extract_content_text (textSection);
		}
		return {'contents': contents, 'img': img}
	}

	function _extract_commentor (ele){
		var commentor = null;
		var profile_img = ele.getElementsByClassName ('UFIActorImage');
		if (profile_img.length == 1){
			commentor = {};
			commentor.fullname = profile_img[0].alt;
			commentor.avatar = profile_img[0].src;
			var result = _extract_profile_path (profile_img[0].parentNode);
			commentor.messenger_path = result[3];
			commentor.profile_path = result[2];
			commentor.nameid = result[1];
			commentor.id = result [0];			
		}

		return commentor;
	}

	function _extract_comment_content (ele){
		var content = null;
		var postingTime = null;
		var contentWrapper = ele.getElementsByClassName ('UFICommentBody');
		if (contentWrapper.length == 1){
			content = contentWrapper[0].innerHTML;
			var ctime = ele.getElementsByClassName ('livetimestamp')
			if (ctime.length == 1 && ctime[0].localName == 'abbr'){
				postingTime = ctime[0].getAttribute ('data-utime');
			}
		}
		return [content, postingTime];
	}

	function _extract_reply (ele){
		//
	}

	function _extract_comments (ele){
		/*
		Note about the comment div.
			+ Sibling of div that wrap all content. They are child of userContentWrapper.
			+ Each comment is contain with a class "UFIComment".
			+ To obtain user name and profile, get all element `a`. The element contain `img` element whose class is "UFIActorImage". The attribute `alt` of the img contain user name. 
			+ To obtain the comment content, from the comment element, get the element with class "UFICommentBody". There exists only one. Get its property `innerHTML`.
			+ To get Replies for each comment, get its next sibling. If the sibling is " UFIReplyList", the element contains replies. Each reply has the same structure of normal comment.
			+ Ignore replies, since sometimes, it require to load. In other words, the replies may not be available at extracting time.

		*/

		var comments = [];
		var userContentWrapper = ele.getElementsByClassName ('userContentWrapper')[0];
		if (userContentWrapper.childElementCount == 2){
			var commentWrapper = userContentWrapper.children[1];
			var commentList = commentWrapper.getElementsByClassName ('UFIComment');
			for (var i = 0; i < commentList.length; i++){
				var acomment = commentList[i]
				var commentor = _extract_commentor (acomment);
				var content_result = _extract_comment_content (acomment);
				comments.push ({'content': content_result[0], 'postingTime': content_result[1], 'commentor': commentor});
			}
		}

		return comments
	}

	function _extract_page_statistic (){
	}

	function _extractData (postList){
		var postList = postList ? postList : _get_posting_list ();
		var data = [];
		var pnum = postList.length;
		for (var i = 0; i < pnum; i++){
			var x = postList[i];
			temp = {};
			temp.author = _extract_author (x);
			temp.content = _extract_content (x);
			temp.content.postingTime = temp.author.postingTime;
			temp.comments = _extract_comments (x);
			data.push (temp);			
		}

		return data;
	}

	function _extractOldestPostingTime (posts){
		/*
		Extract the posting time of the oldest post so far
		*/

		posts = posts ? posts : _get_posting_list ();
		var oldestPostingTime = -1;
		var oldestPost = posts[posts.length - 1];
		if (oldestPost){
			var _userContent = oldestPost.getElementsByClassName ('userContent');
			var _authorWrapper = _userContent[0].previousSibling;
			var _postingTimeWrapper = _authorWrapper.getElementsByTagName ('abbr');
			if (_postingTimeWrapper.length == 1){
				oldestPostingTime = _postingTimeWrapper[0].getAttribute ('data-utime');
				if (oldestPostingTime){
					oldestPostingTime = new Date (oldestPostingTime * 1000);
				}
				else{
					console.log (oldestPost);
					throw "No posting found!"
				}
			}
			else{
				console.log (oldestPost);
				throw "More than 1 posting time wrapper or no one found"
			}
		}

		return oldestPostingTime
	}

	function _prepare_saved_data (data){
		/*
		Add some statistics before save data
		*/
		return data;
	}	

	function _get_posting_list (lastTime){
		var postWrapper = document.getElementById (DOM_IDS.postList.id);
		var posts = postWrapper.querySelectorAll('[id^=' + DOM_IDS.post.idPattern + ']');
		var lastPostingTime = '';
		if (lastTime){
			while (true){
				lastPostingTime = _extractOldestPostingTime (posts);
				if (lastPostingTime <= CRAWL_LAST_TIME){
					posts.pop ();
				}
				else{
					break;
				}
			}
		}

		return posts		
	}

	function extractData (){
		/*
		Scrolling down to fetch data and stop when at least one of the conditions are met. 
		Then extract data and return.
		The conditions to stop scrolling:
			+ scrolling time reaches a limit
			+ the oldest post being fetched is older than the last time extracting data. Doing so prevent the extractor from extract the already-extracted data.
		
		How to scroll:
			+ scroll in the same pace until reach the end of the page.
			+ after reach the end of a page, check if more data is fetched. If fetched, the length of the post list should be greater than the last one, and thus reset scrolling params and go on with normal flow. 
			+ Otherwise, sleep a while and check again. Try several times before give waiting, and thus stop scrolling.
			+ Time to scroll does not include time to wait for new data being fetched.
		*/

		return new Promise (async function (resolve, reject){
			var currPostNum = _get_posting_list ().length;
			var lastPostNum = currPostNum;
			var scrollTime = 0;
			var currScrollNum = 0;
			var currBodyHeight = document.body.scrollHeight;
			var currTempHeight = currTempHeight;
			var lastBodyHeight = 0;
			var currHeight = 0;
			var waitNum = 0;
			var oldestPostingTime = -1;
			var lastPostingIndex = -1;
			while (true) {
				if (scrollTime >= CRAWL_MAX_SCROLL_TIME || oldestPostingTime <= CRAWL_LAST_TIME){
					break;	
				}

				if (currScrollNum >= CRAWL_MAX_SCROLL_NUM){
					currPostNum = _get_posting_list ().length;
				}

				if (currScrollNum >= CRAWL_MAX_SCROLL_NUM && currPostNum > lastPostNum){
					// Need both conditions to indicate that new data is fetch when scroll to the end of the page.
					currTempHeight = document.body.scrollHeight;
					lastBodyHeight = currBodyHeight;
					currBodyHeight = currTempHeight;
					currScrollNum = 0;
					lastPostNum = currPostNum;
				}
				else if (currScrollNum >= CRAWL_MAX_SCROLL_NUM && currPostNum == lastPostNum && waitNum <= CRAWL_MAX_WAIT_NUM){
					// To the end but no data is fetched. Wait.
					await sleep (CRAWL_DATA_WAIT_TIME);
					waitNum++;
					continue;	
				}
				else if (currScrollNum >= CRAWL_MAX_SCROLL_NUM && currPostNum == lastPostNum && waitNum > CRAWL_MAX_WAIT_NUM){
					// No hope new data being fetched. Stop scrolling.
					break;
				}

				t = randomWaitTime (CRAWL_MAX_WAIT_TIME);
				await sleep (t);

				currHeight = lastBodyHeight + (currBodyHeight - lastBodyHeight) / (CRAWL_MAX_SCROLL_NUM - currScrollNum);
				window.scrollTo (0, currHeight);

				scrollTime += t;
				currScrollNum += CRAWL_SCROLL_JUMP;
				oldestPostingTime = _extractOldestPostingTime ();
			}

			posts = _get_posting_list (CRAWL_LAST_TIME);
			console.log (posts);
			var data = _extractData (posts);
			data = _prepare_saved_data (data)
			resolve (data)
		})
	}

	function saveState (){
		/*
			Save state of content in the current running.

		*/
	}

	function getState (){
		/*
			Get state of content script in the last running
		*/
	}

	function sleep (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function randomWaitTime (maxtime){
		// maxtime is an integer.
		maxtime = maxtime ? maxtime : 3
		t = Math.random () * maxtime * 1000 + 1000;
		return t
	}	

});


