/*
Represent an query a user uses when looking for some content through the search bar.
The query is used to better return search result or make search suggestions.

::property sessionid:: ObjectId created at the beginning of a session.
*/

var mongoose = require ('mongoose');

var QuerySchema = mongoose.Schema ({
	sessionid: {type: mongoose.Schema.Types.ObjectId, require: true},
	userid: mongoose.Schema.Types.ObjectId,
	query: String,
	repeated: {count: Number, at: [Date]},
	createdAt: {type: Date, default: Date.now},
});

mongoose.model ('Queries', QuerySchema);