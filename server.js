// server.js

// set-up all the required tools!
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

// express middleware..?
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var dbConfig     = require('./config/database.js'); // set-up mongoDB url

// configuration
mongoose.connect(dbConfig.url); // connect to our mongoDB database

// set-up Express application
app.set('view engine', 'ejs'); // ejs templating (not sure if needed..)
app.use(morgan('dev')); // this will log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from HTML forms

// required for passport
app.use(session({ secret : 'gethired' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()) // use connect-flash for flash messages

// routing
require('./app/routes.js')(app, passport); // load routes and pass in our app and fully configured passport

// launch the thing
app.listen(port);
console.log('IM ALIVEEEE! on.. port ' + port);