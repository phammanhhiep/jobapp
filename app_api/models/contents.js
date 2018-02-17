/*
ContentSchema
- For content like tutorial or analysis of some issues. A user will publish such content to attract more followers. Or it could be an announcement from a business.

::property business:: Refer to the business to which the content belongs.

Issues:
- Probabily need more than one collection to keep each of models in long-term. 
*/

var mongoose = require ('mongoose');

var ContentSchema = mongoose.Schema ({
	userid: mongoose.Schema.Types.ObjectId,
	business: mongoose.Schema.Types.ObjectId,
	categories: [Number],
	tags: [String],
	title: String,
	content: String,
	comments: {count: Number, updatedAt: Date},
	shares: {count: Number, updatedAt: Date},
	likes: {count: Number, updatedAt: Date}, // reactions
	saving: {count: Number, updatedAt: Date}, // reactions
	reports: [{createdAt: Date, reason: Number, desc: String}],
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],	
	/// Job posting
	application:[{
		candidateid: mongoose.Schema.Types.ObjectId,
		createdAt: {type: Date, default: Date.now},
	}],	
	/// Job requesting
	recommended:[{
		jobid: mongoose.Schema.Types.ObjectId,
		recommender: mongoose.Schema.Types.ObjectId,
		createdAt: {type: Date, default: Date.now}
	}],	
});

mongoose.model ('Contents', ContentSchema);