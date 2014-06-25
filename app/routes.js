module.exports = function(app, passport) {

// normal routing

// get the home-page
app.get('/', function(req, res) {
  res.render('index.ejs');
});


app.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('something') });
});

// process a user's login
app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirects to profile
  failureRedirect : '/login', // redirects back to login
  failureFlash    : true // allow flash messages
}));

}