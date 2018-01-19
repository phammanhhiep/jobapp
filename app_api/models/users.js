/*

::property businesses:: ids of business created or managed by the user
::property followingUsers:: ids of users who being followed
::property followingBusinesses:: ids of businesses which being followed
::property followerUsers:: contain basic infor about users who follow the users and pointer to the list of user who do so.

::property permission:: specify which resource to be about to access
::property role:: role of a user. {1: admin, 2: manager, 3: staff, 4: user}

*/

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var addrSchema = new mongoose.Schema({
	country: {type: Number, 'default': 1},
	state: {type: Number}, // or city
	addr1: {type: String}, // line 1: district, ...
	addr2: {type: String}, // line 2: apt or section
	zipCode: Number,	
});

var eduSchema = new mongoose.Schema({
	school: {name: String, id: mongoose.Schema.Types.ObjectId},
	title: {type: String}, // phd, master, undergraduate, 
	start: {type: Date},
	end: {type: Date},
});	

var workexpSchema = new mongoose.Schema({
	position: {type: Number},
	jd: String, // job descriptions
	accomplishments: String,
	jobid: mongoose.Schema.Types.ObjectId, // if get job from this website
	compName: String,
	salary: Number,
	start: {type: Date},
	end: {type: Date},	
});

var saveContent = new mongoose.Schema ({
	authorid: mongoose.Schema.Types.ObjectId,
	contentid: mongoose.Schema.Types.ObjectId,
	categories: [Number],
	createdAt: {type: Date, default: Date.now},
});

var UsersSchema = mongoose.Schema({
	////////////////////////////////// Profile info
	fullname: {type: String, required: true},
	firstname: {type: String, required: true},
	middlename: {type: String},
	lastname: {type: String, required: true},
	birthday: {type: Date, required: true},
	gender: {type: Number, required: true},
	phones: [{type: String, required: true}],
	addresses: [addrSchema],
	emails: [{type: String, required: true}],
	edu: [eduSchema],
	workexp: [workexpSchema],
	jobinterests: [Number],
	
	////////////////////////////////// Social Activities
	saveContent: [saveContent],
	followingUsers: [mongoose.Schema.Types.ObjectId],
	followingBusinesses: [mongoose.Schema.Types.ObjectId],
	businesses: [mongoose.Schema.Types.ObjectId],
	followerUsers: {count: Number, listid: mongoose.Schema.Types.ObjectId},
	/////////////////////////////////// Sercurity
	role: {type: Number, required: true},
	permissions: mongoose.Schema.Types.Mixed, 
	createdAt: {type: Date, default: Date.now},
	updatedAt: [{
		time: {type: Date}, 
		reasons: String,
		by: mongoose.Schema.Types.ObjectId // user or admin
	}],
	active: {type: Boolean, default: true},
	deactiveAt: [{time: Date, reason: String}],

	/////////////////////////////////// Authentication
	google: { // not complete
		token: String,
		email: String,
		name: String,
		id: String
	},
	facebook: { // not complete
		token: String,
		email: String,
		name: String,
		id: String
	},
	hash: String,
	salt: String,
});


UsersSchema.methods.setPassword = function (passwd){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(passwd, this.salt, 1000, 64).toString('hex');
};

UsersSchema.methods.validPassword = function (passwd){
	var hash = crypto.pbkdf2Sync(passwd, this.salt, 1000, 64).toString('hex');
	return this.hash === hash
};

UsersSchema.methods.generateJwt = function (passwd, dayNum){
	dayNum = dayNum ? dayNum : 365; // subject to CHANGE
	var expiry = new Date ();
	expiry.setDate (expiry.getDate() + dayNum);

	return jwt.sign ( // include fields to return when user login or register
		{	
			_id: this._id,
			phone: this.phone ? this.phone[0] : '',
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email ? this.email[0] : '',
			permissions: this.permissions,
			exp: parseInt(expiry.getTime() / 1000)
		},
		process.env.JWT_SECRET
	);
};

UsersSchema.methods.createFullname = function (){
	this.fullname = this.lastname + ' ' + (this.middlename ?  this.middlename + ' ' : '') + this.firstname;
}

mongoose.model ('Users', UsersSchema);