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

	this.businessTemplate = function (req, res, next){
		res.render ('business');
	};

	this.connectionTemplate = function (req, res, next){
		res.render ('connections');
	};

	this.conversationTemplate = function (req, res, next){
		res.render ('conversations');
	};

	this.interestTemplate = function (req, res, next){
		res.render ('interests');
	};

	this.notificationTemplate = function (req, res, next){
		res.render ('notifications');
	};

	this.qaTemplate = function (req, res, next){
		res.render ('qa');
	};

	this.saveTemplate = function (req, res, next){
		res.render ('save');
	};	

}