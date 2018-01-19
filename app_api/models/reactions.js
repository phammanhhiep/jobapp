/*
Record reactions by a users.
At this moment, only allow to like or unlike. No other reaction is allowed.

::property category:: A kind of reaction. {1: like, 2: dislike}
*/

var mongoose = require ('mongoose');

var ReactionSchema = mongoose.Schema ({
	userid: mongoose.Schema.Types.ObjectId,
	contentid: mongoose.Schema.Types.ObjectId,
	contentType: Number,
	category: {type: Number, default: 1},
	createdAt: {type: Date, default: Date.now},
	updatedAt: [Date],
});

mongoose.model ('Reactions', ReactionSchema);