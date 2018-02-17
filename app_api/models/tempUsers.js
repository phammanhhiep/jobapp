/*
Temporary users. Created when information about the users are crawled on the web. Later, being convert to normal user if they login.

::property id:: id on a website like Facebook.
::property postingids:: ids of postings by the user
*/

var mongoose = require ('mongoose');

var TempUserSchema = mongoose.Schema ({
	fullname: {type: String, required: true},
	id: String,
	avatar: String,
	phone: [String],
	email: [String],
	postingids: [String],
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],
	note: [{createdAt: Date, content: String}],
});

mongoose.model ('TempUsers', TempUserSchema);