process.env.NODE_ENV = 'test';
var chai = require ('chai');
var chaiHttp = require ('chai-http');
var server = require ('../../../app');
var mongoose = require ('mongoose');
var Users = mongoose.model ('Users');
var should = chai.should ();
var moment = require ('moment');

chai.use (chaiHttp);

describe ('Profile', function (){
	beforeEach (function (){

	});

	afterEach (function (){

	});

	it ('should return some public information given the request has no permission');
	it ('should return all information given the request has permission');
	it ('should update profile if user is permited');
	// possibile to test update each section of the profile
});