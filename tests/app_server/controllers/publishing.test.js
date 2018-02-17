process.env.NODE_ENV = 'test';
var chai = require ('chai');
var chaiHttp = require ('chai-http');
var server = require ('../../../app');
var mongoose = require ('mongoose');
var Users = mongoose.model ('Users');
var Contents = mongoose.model ('Contents');
var should = chai.should ();
var moment = require ('moment');

chai.use (chaiHttp);

describe ('Publishing', function (){
	beforeEach (function (){

	});

	afterEach (function (){

	});

	it ('should allow to access publishing page associated with a individual or a business page if the user is permited');
	it ('should allow to publish a content if the users associated with the content is the same as user requests to publish');
	it ('should allow to publish a content in a business page if the users is permited');
	it ('should allow anyone to review a business page');


});