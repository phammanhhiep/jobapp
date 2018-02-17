var express = require("express");

var router = express.Router();
var CrawlerCtrl = require ('../controllers/crawlers');

// var authCtrl = require ('../controllers/authentication');
// var usersCtrl = require("../controllers/users");

// router.post ('/register', authCtrl.register);
// router.post ('/login', authCtrl.login);

// router.get('/users', usersCtrl.readSomeUsers);
// router.get('/users/user/:uId', usersCtrl.readOneUserById);
// router.post('/users/create', usersCtrl.createOneUser);
// router.post('/users/user/:uId/edit', usersCtrl.updateOneUserById);

module.exports = router;

router.get ('/crawl/pages', CrawlerCtrl.Pages.read);
router.post ('/crawl/pages', CrawlerCtrl.Pages.insert);
router.post ('/crawl/pages/update', CrawlerCtrl.Pages.update);

router.post ('/crawl/users', CrawlerCtrl.Users.insert);
router.post ('/crawl/users/update', CrawlerCtrl.Users.update);

router.post ('/crawl/contents', CrawlerCtrl.Contents.insert);
