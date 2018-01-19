var MGDB = require('../../libs/node/db').MGDB;

if (process.env.NODE_ENV === 'development'){
	var host = process.env.DB_LOCAL_HOST;
	var db = process.env.DEV_DB_NAME;
}
else if (process.env.NODE_ENV === 'test'){
	var host = process.env.DB_LOCAL_HOST;
	var db = process.env.TEST_DB_NAME;
}
else if (process.env.NODE_ENV === 'production'){
	var host = process.env.DB_REMOTE_HOST;
	var db = process.env.DB_NAME;
};

var port = process.env.DB_PORT;
var username = process.env.DB_USERNAME;
var passwd = process.env.DB_PWS;

var mgdb = new MGDB (host, port, db, username, passwd);

mgdb.connect ();

require ('./advertisements');
require ('./businesses');
require ('./comments');
require ('./contents');
require ('./conversations');
require ('./followers');
require ('./notifications');
require ('./params');
require ('./queries');
require ('./reactions');
require ('./shares');
require ('./users');
require ('./views');