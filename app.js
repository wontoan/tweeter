var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

//JavaScript files in 'routes' dir
var api = require('./routes/api');
//var authenticate = require('./routes/authenticate');

mongoose.connect('mongodb://localhost:27017/tweeter-test');

//Middleware 
app.use('/controllers', express.static(__dirname + '/app/controllers/'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/public/views'));

app.use(session({
  secret: 'classified secret';
}));
app.use('/api', api);
//app.use('/auth', authenticate);
app.use(passport.initialize());
app.use(passport.session);

//Grabs our init-passport.js file. Important that we do this AFTER we initialized passport (lines 25-26)
var initPassport = require('./passport-init');
initPassport(passport);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/login.html'));
});

app.get('/register', function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/register.html'));
});

app.get('/home', function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/main.html'));
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});