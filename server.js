// Load dependencies 
var express       = require('express');
var app           = express();
var port          = process.env.PORT || 9000;
var mongoose      = require('mongoose');

// Express Middleware
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var dbConfig     = require('./config/database.js'); // set-up mongoDB url

// configuration
mongoose.connect(dbConfig.url); // connect to our mongoDB database

// Set-up Express Application
app.set('view engine', 'ejs'); // ejs templating 
app.use(morgan('dev')); // Log all requests to console
app.use(cookieParser()); // Read cookies for auth
app.use(bodyParser()); // Get information from HTML forms

// Media
app.use(express.static(__dirname + '/public'));

// Routing
require('./config/routes.js')(app);

// Launch the beast
app.listen(port);
console.log('IM ALIVEEEE! on.. port ' + port);