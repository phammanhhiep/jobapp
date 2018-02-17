/*
	The process:
		- Receive last states from server includng website urls, last crawling time. 
		- For each website, open an wait call content script to extract.
		- After each successful extract, save their page states, and statistics. 
		Statistics include job posting number, 

*/
var TODAY = new Date (); TODAY.setHours (5);
var TEMP_LAST_CRAWL_TIME = new Date (TODAY); TEMP_LAST_CRAWL_TIME.setDate (TEMP_LAST_CRAWL_TIME.getDate () - 8);
var EXTRACT = 0;
var FGGROUP_LIST = [ // USE TEMPORARILY
	// 'https://www.facebook.com/groups/vieclamitvietnam/',
	// 'https://www.facebook.com/groups/1444315562541612/',	
	// 'https://www.facebook.com/groups/timvieclam20/',
	{url: 'C:/Users/Acer/Desktop/vieclamitvietnam.html', lastCrawlTime: TEMP_LAST_CRAWL_TIME},
	{url: 'C:/Users/Acer/Desktop/vieclam.html', lastCrawlTime: TEMP_LAST_CRAWL_TIME},
];

var OTHER_PAGE_LIST = [];
var PAGE_STATE_URL = 'http://127.0.0.1:30000/api/crawl/pages';
var SAVE_CONTENT_URL = 'http://127.0.0.1:30000/api/crawl/contents';
var CURR_URL = '';

listenToContentReadyMessage ();
// getStates (PAGE_STATE_URL); // TEMPORARILY NOT USE.

function init (){
	openTab (FGGROUP_LIST);
}

function openTab (list){
	var target_page = list [0];
	if (!target_page){
		return;
	} 
	var url = _getFbGroupUrl (target_page.url);
	_setExtractStatus (1);
	CURR_URL = url;
	CRAWL_LAST_TIME = target_page.lastCrawlTime;
	console.log ('Start openning new tab ...');
	chrome.tabs.create ({url: url}, function (tab){
		list.shift ();
	});
};

function listenToContentReadyMessage (){
	chrome.runtime.onConnect.addListener(function(port) {
		console.assert(port.name == 'content_state');
		port.onMessage.addListener(function(msg) {
			if (msg.content_state == 1 && EXTRACT == 1){
				msg = {
					action: 1, 
					last_page: false,
					constants: {
						CRAWL_LAST_TIME: CRAWL_LAST_TIME,
					}
				};

				if (FGGROUP_LIST.length == 1){
					msg.last_page = true;
				}
				port.postMessage(msg);
			}
			else if (msg.content_state == 1 && EXTRACT == 0){
				port.postMessage({action: 0});
			}
			else if (msg.extract_status){
				console.log (msg);
				_setExtractStatus (0);
				openTab (FGGROUP_LIST);
			}
			else if (msg.error){
				console.log (msg.error);
				record_extract_errors (msg.error);
				_setExtractStatus (0);
				openTab (FGGROUP_LIST);
			}

		});
	});	
}

function _getFbGroupUrl (url){
	sorted_setting = '?sorting_setting=CHRONOLOGICAL';
	return url + sorted_setting;
}

function _setExtractStatus (status){
	EXTRACT = status;
}

function recordErrors (){
	// save information somewhere ...
}

function getStates (){
	/*
	Get facebook group states:
		- List of fbgroup urls and their corresponding last crawling time.	
	Get other website states:
		- List of website urls and their corresponding last crawling time.		
	*/

	$.ajax ({
		method: 'GET',
		url: PAGE_STATE_URL,
	}).done (function (data){
		console.log ('Successfully receiving data!');
		FGGROUP_LIST = data['fbgroups'];
		OTHER_PAGE_LIST = data['other'];

	}).fail (function (err, status){
		console.log ('err ' + status)
	})
};

function savePages (state){

}

function saveData (data, url){
	$.ajax ({
		method: 'POST',
		url: url,
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=UTF-8",
	}).done (function (msg){
		console.log ('done sending data ...');
		console.log (msg);

	}).fail (function (err, status){
		console.log ('err ' + status)
	})
};