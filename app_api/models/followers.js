/*
Represent all followers of a users
May not record all the followers, but a sample.
Used to record both follower of individuals and businesses

::property subjectid:: a user id or a business id of the user being followed. 
::property category:: indicate if a business or a user. {1: user, 2: business}
*/

var mongoose = require ('mongoose');

var FollowerSchema = mongoose.Schema ({
	subjectid: mongoose.Schema.Types.ObjectId,
	category: {type: Number, default: 1},
	followerids: [mongoose.Schema.Types.ObjectId],
	capacity: {type: Number, default: 500},
});

mongoose.model ('Followers', FollowerSchema);