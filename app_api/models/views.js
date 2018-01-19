/*
ViewSchema
- Record which content or page a user views durring a session.
::property sessionid:: ObjectId created at the beginning of a session.
::property pages:: No decide yet what to store in the property. Could be the page link. But more useful if it contains something that reveals about the content of the page. 
*/

var mongoose = require ('mongoose');

var ViewSchema = mongoose.Schema ({
	sessionid: {type: mongoose.Schema.Types.ObjectId, require: true}, // check again this on
	start: {type: Date, default: Date.now},
	end: Date,
	pages: [{name: String, at: Date}], // ???
})

mongoose.model ('Views', ViewSchema);