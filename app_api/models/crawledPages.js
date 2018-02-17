/* 
Represent a page being crawled

::property id:: id of a page assigned by its system (Facebook)
::property category:: {1: facebook group, 2: facebook fanpage, 3: other websites}
::property memberNum:: relevant to facebook group and fanpage.
*/

var mongoose = require ('mongoose');
var moment = require ('moment');

var CrawledPageSchema = mongoose.Schema ({
	url: String,
	id: String,
	category: Number,
	memberNum: Number,
	lastCrawlTime: Date,
	statistics: [{		
		postingNumber: Number,
		createdAt: Date,
	}],
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],
	note: [{createdAt: Date, content: String}],
	active: {type: Boolean, default: true},
});

CrawledPageSchema.methods.updateLastCrawlTime = function (){
	this.lastCrawlTime = moment ();
};

CrawledPageSchema.methods.insertNote = function (note){
	this.note = [{content: note, createdAt: moment ()}];
};

CrawledPageSchema.methods.deactivate = function (){
	this.active = false;
};

CrawledPageSchema.methods.reactivate = function (){
	this.active = true;
};

mongoose.model ('CrawledPages', CrawledPageSchema);