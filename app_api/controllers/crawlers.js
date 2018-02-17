var mongoose = require('mongoose');
var TempUsers = mongoose.model('TempUsers');
var RawContents = mongoose.model('RawContents');
var CrawledPages = mongoose.model('CrawledPages');

module.exports = {
	Users: new TempUserCtrl (),
	Contents: new RawContentCtrl (),
	Pages: new CrawledPageCtrl ()
}

function TempUserCtrl (){
	this.insert = function (req, res, next){
		// insert several users
		var users = req.body.users;
		TempUsers.insertMany (users, function (err, docs){
			if (err){
				next (err);
			}
			else{
				res.json ({msg: 'OK', total: len (docs)});
			}			
		});
	};

	this.update = function (req, res, next){
		// update posting ids of a user
		var update = {};
		var userid = req.body._id;
		if (req.body.postingids){
			update.$push = {postingids: req.body.postingids}
		}
		if (req.body.phone){
			if (update.$push){
				update.$push.phone = req.body.phone;
			}
			else{
				update.$push = {phone: req.body.phone};
			}
			
		}
		if (req.body.email){
			if (update.$push){
				update.$push.email = req.body.email;
			}
			else{
				update.$push = {email: req.body.email};
			}
			
		}

		if (Object.keys (update).length > 0 && userid){
			TempUsers.update ({_id: userid}, update, function (err, result){
				if (err){
					next (err);
				}
				else{
					res.json ({msg: 'OK', total: len (docs)});
				}					
			});
		}
		else{
			next ();
		}
	};

};

function RawContentCtrl (){
	this.insert = function (req, res, next){
		// insert several contents
		var contents = req.body.contents;
		RawContents.insertMany (contents, function (err, docs){
			if (err){
				next (err);
			}
			else{
				res.json ({msg: 'OK', total: len (docs)});
			}			
		});		
	};

}

function CrawledPageCtrl (){
	this.insert = function (req, res, next){
		// insert several pages
		var pages = req.body.pages;
		CrawledPages.insertMany (pages, function (err, docs){
			if (err){
				next (err);
			}
			else{
				res.json ({msg: 'OK', total: len (docs)});
			}
		});
	};

	this.update = function (){
		// update one page
	};	

	this.read = function (req, res, next){
		CrawledPages.find (
			{active: true}, {url: 1, category: 1, lastCrawlTime: 1}, 
			function (err, docs){
				if (err){
					next (err)
				}
				else{
					res.json ({data: docs});
				}
		})
	};
}