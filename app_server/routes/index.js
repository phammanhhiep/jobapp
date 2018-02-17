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

// Favicon
router.get('/favicon.ico', function (req,res,next){
	res.status (204);
});

// Get template
router.get('/template/home', OthersCtrl.homeTemplate);
router.get('/template/login', OthersCtrl.loginTemplate);
router.get('/template/register', OthersCtrl.registerTemplate);
router.get('/template/publish', OthersCtrl.publishTemplate);
router.get('/template/profile', OthersCtrl.profileTemplate);
router.get('/template/content', OthersCtrl.contentTemplate);
router.get('/template/search', OthersCtrl.searchTemplate);
router.get('/template/business', OthersCtrl.businessTemplate);
router.get('/template/connections', OthersCtrl.connectionTemplate);
router.get('/template/conversations', OthersCtrl.conversationTemplate);
router.get('/template/interest', OthersCtrl.interestTemplate);
router.get('/template/notifications', OthersCtrl.notificationTemplate);
router.get('/template/qa', OthersCtrl.qaTemplate);
router.get('/template/save', OthersCtrl.saveTemplate);


// //Login page
// router.get('/login', OthersCtrl.login);
// router.get('/register', OthersCtrl.register);



module.exports = router;