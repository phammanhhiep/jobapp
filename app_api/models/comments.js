/*
CommentSchema
::property parentid:: id of a content or a comment which the comment is of. 
::property level:: first or second level. First level means the comment of the content. 
Second level means the reply of a comment
::property index:: the index of the comment within its level. 

Issues
- Probably need more than one collection to store the comment in long-term.
*/

var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema ({
	parentid: mongoose.Schema.Types.ObjectId,
	level: Number, 
	index: Number,
	likes: {total: Number, userids: [mongoose.Schema.Types.ObjectId]},
});

mongoose.model ('Comments', CommentSchema);