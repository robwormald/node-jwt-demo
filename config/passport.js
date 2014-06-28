// Load dependencies 
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../app/models/user');

// Pass to our Application
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Sign-Up
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      // Check if User exists and throw error
      User.findOne({ 'local.username' : username }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false);

       } else {
        // Create User
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        // Additional Fields
        newUser.local.firstname = req.body.firstname; // added 'First Name' user field
        newUser.local.lastname  = req.body.lastname; // added 'Last Name' user field
        // Save User
        newUser.save(function(err) {
          if (err) 
            throw err;
          return done(null, newUser);
        });
       }
      });
    });
  }));

  // Local Login
  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username' : username }, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false);

      if (!user.validPassword(password))
        return done(null, false);

      return done(null, user);
    });
  }));
};