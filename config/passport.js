var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

passport.use('local-login', new LocalStrategy({
  //z
}));

}