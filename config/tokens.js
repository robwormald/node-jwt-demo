var jwt = require('jsonwebtoken');
var User = require('../app/models/user');

//this is the secret used to verify tokens. typically you'd want to use environment variables for this, rather than storing it in your repo.
var tokenSecret = process.env.TOKEN_SECRET || 'shhhh';

function verifyUser(username, password, done) {
  User.findOne({ 'local.username' : username }, function(err, user) {
    if (err)
      return done(err);
    if (!user)
      return done(null, false);

    if (!user.validPassword(password))
      return done(null, false);

    return done(null, user);
  });
}

function registerUser(newUserInfo,done){

    User.findOne({ 'local.username' : newUserInfo.username }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        return done(null, false);

     } else {
      // Create User
      var newUser = new User();
      newUser.local.username = newUserInfo.username;
      newUser.local.password = newUser.generateHash(newUserInfo.password);
      // Additional Fields
      newUser.local.firstname = newUserInfo.firstname; // added 'First Name' user field
      newUser.local.lastname  = newUserInfo.lastname; // added 'Last Name' user field
      // Save User
      newUser.save(function(err) {
        if (err)
          throw err;
        return done(null, newUser);
      });
     }
    });
}


module.exports.registerUser = function(req,res){

    registerUser(req.body,function(err,user){
        if(err){
            return res.json(500,err);
        }


        res.json({username: user.local.username, id: user._id});

    })
}

module.exports.issueToken = function(req,res){

    //grab username and password
    var username = req.body.username;
    var password = req.body.password;

    //both username and password required;
    if(!username || !password){
        return res.json(403,{error: 'username and password required'});
    }

    //verify
    verifyUser(username,password,function(err,user){

        if(err){
            return res.json(403,{error: 'invalid username or password'});
        }


        //send some user profile details
        var profile = {
            username : user.local.username,
            id: user._id
            //etc
        }

        //create a new token
        var token = jwt.sign(profile, tokenSecret, { expiresInMinutes : 60 });

        //send the response;
        return res.json({token: token, user: profile });
    })
};

module.exports.verifyToken = function(req,res,next){

    //grab token from url params or header
    //eg GET foo?token=abdcsdf
    var token = req.query.token || req.headers.token;

    if(!token){
        return res.json(403,'token required!');
    }

    jwt.verify(token,tokenSecret,function(err,payload){

        if(err){
            return res.json(403,'invalid token');
        };

        req.user = payload;

        next();
    })

}
