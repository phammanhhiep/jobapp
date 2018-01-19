/*
BusinessSchema
- Represent a business. Not a user, but being owned by a user.

::property managerid:: id of user who manage the business page
::property categories:: ids of industrial categories to which the business belong.
::property employeesid:: ids of users who are working or worked here.
::property employeenumber:: Not actual number of employee but a range. 1 for below 50. 2 for 50-100. 3 for 100-500. 4 for above 500.

Issues
- Consider to include the following properties: 
	+ contentids: content ids of the content created by the business. 
	+ jobpostingids
*/

var mongoose = require ('mongoose');

var positionSchema = mongoose.Schema ({
	title: String,
	salary: Number,
	description: String,
})

var BusinessSchema = mongoose.Schema ({
	creatorid: mongoose.Schema.Types.ObjectId,
	managerid: [{id: mongoose.Schema.Types.ObjectId, role: Number, createdAt: Date}],
	title: String,
	founded: Date,
	categories: [Number],
	employeenumber: Number,
	employeesid: [mongoose.Schema.Types.ObjectId],
	positions: [positionSchema],
	contentid: [mongoose.Schema.Types.ObjectId],
	jobpostingid: [mongoose.Schema.Types.ObjectId],
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],
});

mongoose.model ('Businesses', BusinessSchema);