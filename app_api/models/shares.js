/*

*/

var mongoose = require ('mongoose');

var ShareSchema = mongoose.Schema ({
	userid: mongoose.Schema.Types.ObjectId,
	contentid: mongoose.Schema.Types.ObjectId,
	contentType: Number,
	destination: String,
	createdAt: {type: Date, default: Date.now},
});

mongoose.model ('Shares', ShareSchema);