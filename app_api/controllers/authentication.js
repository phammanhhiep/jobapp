var mongoose = require('mongoose');
var Users = mongoose.model ('Users');
var passport = require ('passport');

module.exports = new Authentication ();

function Authentication () {

	this.register = function (req, res, next){
		// FIX: include other required data
		function checkRequiredInput (data){
			if (!data.phone || !data.firstname || !data.lastname || !data.password) return false
			else return true
		}

		// FIX: placeholder
		function checkAccountCreated (data){
			if (data.phone == 'created') return true
			else return false
		}

		if (!checkRequiredInput (req.body)) {
			res.status (400);
			return res.json ({message: 'Input required'});
		};

		if (checkAccountCreated (req.body)){
			res.status (400);
			return res.json ({message: 'Created account'});
		}

		try {
			var user = new Users (req.body);
			user.setPassword (req.body.password);
			user.save (function (err, data){
				if (err) {
					console.log (err);
					next (err);
				}
				else {
					var token = user.generateJwt ();
					return res.json ({token: token});					
				}
			});
		}
		catch (err) {
			console.log (err);
			next (err);
		}
	};

	this.login = function (req, res, next) {
		passport.authenticate ('local', function (err, user, info){
			var token;
			if (err) throw new Error (err);
			if (user) 	{
				token = user.generateJwt ();
				return res.json ({token: token});
			}
			else {
				res.status (400);
				return res.json ({message: info});
			}
		}) (req, res);
	}
}