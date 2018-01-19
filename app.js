require('dotenv').load();

var express = require('express'),
    url = require ('url'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    passport = require('passport'),
    session = require('express-session');

require('./app_api/models/db'); // Connect database
// require('./app_api/config/passport')(passport); // For authentication

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var http = require('http');
// app.use(require('helmet')()); // Secure Express servers through setting HTTP headers

app.set('views', path.join(__dirname, 'app_server', 'views')); // View engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // Set static folder
app.use(express.static(path.join(__dirname, 'app_client')));

// app.use(session({ // Session, initialize
//     secret: process.env.SESSION_SECRET, 
//     resave: true,
//     saveUninitialized: true,
// })); 
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use('/', routes);
app.use('/api', routesApi);

app.use(function(req, res, next) {
    // catch 404 and forward to error handler
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


app.use(function(err, req, res, next) {
    // error handler
    console.log (err)
    res.locals.message = err.message; // set locals, only providing error in development
    res.locals.error = (req.app.get('env') === 'development' || req.app.get('env') === 'test') ? err : {};

    res.status(err.status || 500);
    res.json ({error: err});
});

module.exports = app;
