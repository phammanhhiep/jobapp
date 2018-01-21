/*
Login, sign up, log out, home

*/

module.exports = new Others ();

function Others (){
	this.angularApp = function (req, res, next){
		res.render ('layout');
	};

	this.homeTemplate = function (req, res, next){
		res.render ('home');
	};

	this.loginTemplate = function (req, res, next){
		res.render ('login');
	};

	this.registerTemplate = function (req, res, next){
		res.render ('register');
	};

	this.publishTemplate = function (req, res, next){
		res.render ('publish');
	};

	this.profileTemplate = function (req, res, next){
		res.render ('profile');
	};

	this.contentTemplate = function (req, res, next){
		res.render ('content');
	};

	this.searchTemplate = function (req, res, next){
		res.render ('search');
	};

}