/*
Content is crawled and not yet being processed.

::property id:: id assigned by its original system (Facebook).
::property user:: include both id of the system and id in the user original system. (Facebook)
::property commenters:: only the first commenters, and ordered in the same chronological order.	
::property parentid:: Only exists for a reply of a comment. id of the parent comment.
*/

var mongoose = require ('mongoose');

var RawContentSchema = mongoose.Schema ({
	id: String,
	user: {id: String, _id: mongoose.Schema.Types.ObjectId},
	pageid: mongoose.Schema.Types.ObjectId,
	business: mongoose.Schema.Types.ObjectId,
	categories: [Number],
	tags: [String],
	title: String,
	content: String,
	composedAt: Date,
	comments: [{
		id: String,
		parentid: String,
		users: {id: String, _id: mongoose.Schema.Types.ObjectId},
		content: String,
	}],
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],	
});

mongoose.model ('RawContents', RawContentSchema);