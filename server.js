// Load dependencies 
var express       = require('express');
var app           = express();
var port          = process.env.PORT || 9000;
var mongoose      = require('mongoose');
var passport      = require('passport');
var flash         = require('connect-flash');

// Express Middleware
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var dbConfig     = require('./config/database.js'); // set-up mongoDB url

// configuration
mongoose.connect(dbConfig.url); // connect to our mongoDB database

require('./config/passport')(passport); // passes passport for configuration

  // Set-up Express Application
  app.set('view engine', 'ejs'); // ejs templating (temporary until Angular... if I have time)
  app.use(morgan('dev')); // Log all requests to console
  app.use(cookieParser()); // Read cookies for auth
  app.use(bodyParser()); // Get information from HTML forms

  // required for passport
  app.use(session({ secret : 'gethired' })); // Session Secret
  app.use(passport.initialize());
  app.use(passport.session()); // Persistent Login Sessions
  app.use(flash()) // Connect-Flash for Flash Messages (if I have time..)
  // Media
  app.use(express.static(__dirname + '/public'));

// Routing
require('./config/routes.js')(app, passport); // Load routes and pass in our app and fully configured passport

// Launch the beast
app.listen(port);
console.log('IM ALIVEEEE! on.. port ' + port);