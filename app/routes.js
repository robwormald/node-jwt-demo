module.exports = function(app, passport) {

// get /index
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// GET /login
app.get('/login', function(req, res) {
  res.render('login.ejs');
});

// POST /login
app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirects to profile
  failureRedirect : '/loginFailure', // redirects back to login
}));

// GET /sign-up
app.get('/sign-up', function(req, res) {
  res.render('sign-up.ejs');
});

// POST /sign-up
app.post('/sign-up', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/loginFailure', // redirect back to the signup page if there is an error
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
  res.render('login-failure.ejs');
});

app.get('/loginSuccess', function(req, res) {
  res.send('Successfully authenticated');
});

}

// route to ensure use is logged in before viewing specific pages
// (eg. profile)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}