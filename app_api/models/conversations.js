/*
ConversationSchema
- Represent a chat from a user to another user.

::property status:: indicate the status of the message. Value of 1 means message is sent. Value of 2, message is seen.
*/

var mongoose = require ('mongoose');

var ConversationSchema = mongoose.Schema ({
	sentUserid: mongoose.Schema.Types.ObjectId,
	receiveUserid: mongoose.Schema.Types.ObjectId,
	status: {type: Number, default: 1},
	content: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],

})

mongoose.model ('Conversations', ConversationSchema);