// define everything we need for User
var mongoose = require('mongoose');
    Schema   = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

// define schema for User model
var User = new User({
  username: String,
  password: String,
})

User.plugin(passportLocalMongoose);

// send the model for User to our application
module.exports = mongoose.model('User', User);
