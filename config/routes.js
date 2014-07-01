var User = require('../app/models/user');
var TokenAuth = require('./tokens');

module.exports = function(app) {

///////////////////////
// Node Post Routes //
//////////////////////

//app.post('/api/login', TokenAuth.registerUser);

app.post('/api/sign-up', TokenAuth.registerUser);

////////////////////////////////
// serve the angular app //
////////////////////////////////

app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});


////////////////////////
// Angular Auth Routes //
////////////////////////

//issue a token = kinda like "login"
app.post('/api/getToken',TokenAuth.issueToken);

//get a token's info / validity.
app.get('/api/tokenInfo',TokenAuth.verifyToken,function(req,res){

    res.json(req.user);
});

}