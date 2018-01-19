/*
Later

*/

var mongoose = require ('mongoose');

var targetSchema = mongoose.Schema ({

});

var AdvertisementSchema = mongoose.Schema ({
	userid: mongoose.Schema.Types.ObjectId,
	businessid: mongoose.Schema.Types.ObjectId,
	objectid: mongoose.Schema.Types.ObjectId, 
	category: [Number],
	target: [targetSchema],
	platforms: [Number],
	start: Date,
	end: Date,
	deactivateAt: Date,
	budget: Number,
	total: Number,
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],
});

mongoose.model ('Advertisements', AdvertisementSchema);