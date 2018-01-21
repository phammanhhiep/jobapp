var express = require("express");
var router = express.Router();
var passport = require('passport');
var jwt = require ('express-jwt');

var auth = jwt ({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload', // NOTICE
});

var OthersCtrl = require ('../controllers/others');


// router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate
// 	(
// 		'google', {successRedirect : '/', failureRedirect : '/login'}
// 	));


router.get('/', OthersCtrl.angularApp);

// // Get template
router.get('/template/home', OthersCtrl.homeTemplate);
router.get('/template/login', OthersCtrl.loginTemplate);
router.get('/template/register', OthersCtrl.registerTemplate);
router.get('/template/publish', OthersCtrl.publishTemplate);
router.get('/template/profile', OthersCtrl.profileTemplate);
router.get('/template/content', OthersCtrl.contentTemplate);

// //Login page
// router.get('/login', OthersCtrl.login);
// router.get('/register', OthersCtrl.register);



module.exports = router;