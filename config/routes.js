var User = require('../app/models/user');
var TokenAuth = require('./tokens');

module.exports = function(app, passport) {

///////////////////////
// Node Post Routes //
//////////////////////

app.post('/api/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirects to profile
  failureRedirect : '/loginFailure', // redirects back to login
}));

app.post('/api/sign-up', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/usernameTaken', // redirect back to the signup page if there is an error
}));

////////////////////////////////
// Angular Sorta-hacky Routes //
////////////////////////////////

app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});

app.get('/login', function(req, res) {
  res.sendfile('./public/views/login.html');
});

app.get('/sign-up', function(req, res) {
  res.sendfile('./public/views/signup.html');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
    user : req.user // gets user out of session and passes to the template
  });
});

////////////////////////
// Angular Auth Routes //
////////////////////////

//issue a token = kinda like "login"
app.post('/api/getToken',TokenAuth.issueToken);

//get a token's info / validity.
app.get('/api/tokenInfo',TokenAuth.verifyToken,function(req,res){

    res.json(req.user);
})



////////////////////////
// Failure Re-directs //
////////////////////////

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
