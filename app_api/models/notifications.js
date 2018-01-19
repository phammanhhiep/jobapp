/*

::property objectid:: Content id or some object related to the notification.
*/

var mongoose = require ('mongoose');

var NotificationSchema = mongoose.Schema ({
	userid: mongoose.Schema.Types.ObjectId,
	objectid: mongoose.Schema.Types.ObjectId, 
	category: Number,
	status: Number,
	createdAt: {type: Date, default: Date.now},
});

mongoose.model ('Notifications', NotificationSchema);