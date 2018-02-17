process.env.NODE_ENV = 'test';
var chai = require ('chai');
var chaiHttp = require ('chai-http');
var server = require ('../../../app');
var mongoose = require ('mongoose');
var Contents = mongoose.model ('Contents');
var Users = mongoose.model ('Users');
var should = chai.should ();
var moment = require ('moment');

chai.use (chaiHttp);

describe ('Content', function (){
	beforeEach (function (){

	});

	afterEach (function (){

	});

	it ('should return a content given content id');
	it ('should update a content given content id');
	it ('should save a content given content id');
	it ('should insert or update if the content has at least a number of words');
	it ('should insert or update if the content contain categories');

	// Job posting
	it ('should validate user before allowing him to apply a job');
});