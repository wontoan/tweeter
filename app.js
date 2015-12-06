var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require('passport');

//Mongoose Schemas
require("./models/models");

//JavaScript files in 'routes' dir
var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);

//Connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweeterApp');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(session({
  secret: 'classified',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/auth', authenticate);
app.use('/api', api);

app.use(passport.initialize());
app.use(passport.session());

//Grabs our init-passport.js file. Important that we do this AFTER we initialized passport (lines 25-26)
var initPassport = require('./passport-init');
initPassport(passport);

//var User = mongoose.model('User');
//var wontoan = new User();
//wontoan.username = "wontoan";
//wontoan.password = "password";
//
//wontoan.save(function(err){
//  if (err) {
//    return err;
//  } else {
//    console.log("User Saved");
//  }
//});
//
//var Post = mongoose.model('Post');
//var testPost = new Post();
//testPost.text = "ahadhahdh";
//
//testPost.save(function(err){
//  if (err) {
//    return err;
//  } else {
//    console.log("post Saved");
//  }
//});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

module.exports = app;