
//Taylor change here
var User = require('../app/models/user');

module.exports = function(app, passport) {

//Taylor change here
app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');    
});


// GET /login
//Taylor Change Here
app.get('/login', function(req, res) {
  res.sendfile('./public/views/login.html');
});
//Taylor change here
app.post('/api/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirects to profile
  failureRedirect : '/loginFailure', // redirects back to login
}));

// GET /sign-up
app.get('/sign-up', function(req, res) {
  res.sendfile('./public/views/signup.html');
});

// POST /sign-up
app.post('/api/sign-up', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/usernameTaken', // redirect back to the signup page if there is an error
}));

// GET /profile
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
    user : req.user // gets user out of session and passes to the template
  });
});


// Tests

// Failures/Success (Tests)
app.get('/loginFailure', function(req, res) {
  res.sendfile('./public/views/login-failure.html');
});

// Username is taken failure
app.get('/usernameTaken', function(req, res) {
  res.sendfile('./public/views/username-taken.html');
});

}

// route to ensure use is logged in before viewing specific pages
// (eg. profile)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
