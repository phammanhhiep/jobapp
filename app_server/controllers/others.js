/*
Login, sign up, log out, home

*/

module.exports = new Others ();

function Others (){
	this.homeTemplate = function (req, res, next){
		res.render ('home');
	};

	this.loginTemplate = function (req, res, next){
		res.render ('login');
	};

	this.registerTemplate = function (req, res, next){
		res.render ('register');
	};

	this.angularApp = function (req, res, next){
		res.render ('layout');
	};
}