var mongoose = require('mongoose');

// Wrapper of a Mongoose DB

function MGDB (host, port, dbname, username, passwd){
	this.host = host;
	this.port = port;	
	this.username = username;
	this.passwd = passwd;
	this.dbname = dbname; // must provide

	this.connect = function (){
		var dbURI = this.host ? this.host : 'localhost';
		var dbOptions = {useMongoClient: true};
		if (this.username && this.passwd){
			dbOptions.user = this.username;
			dbOptions.pass = this.passwd;
		}
		dbURI = this.port ? dbURI + ':' + this.port : dbURI;
		dbURI = dbURI + '/' + this.dbname;
		dbURI = 'mongodb://' + dbURI;
		mongoose.connect(dbURI, dbOptions);
		this.listenEvents (dbURI);
	};
 
	this.close = function (msg, callback){
		mongoose.connection.close(function () {
			console.log('Mongoose disconnected through ' + msg);
			if (typeof callback == 'function'){
				callback();
			}
		});
	};

	this.listenEvents = function(dbURI){
		var mgdb = this;
		mongoose.connection.on('connected', function () {
			console.log('Mongoose connected to ' + dbURI);
		});

		mongoose.connection.on('error',function (err) {
			console.log('Mongoose connection error: ' + err);
		});

		mongoose.connection.on('disconnected', function () {
			console.log('Mongoose disconnected');
		});

		// listen and close mongoose connection
		process.once('SIGUSR2', function () {
			mgdb.close('nodemon restart', function () {
				process.kill(process.pid, 'SIGUSR2');
			});
		});

		// listen and close mongoose connection
		process.on('SIGINT', function () {
			mgdb.close('app termination', function () {
				process.exit(0);
			});
		});

	};
};

module.exports.MGDB = MGDB;
