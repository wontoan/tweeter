var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', authenticate);
app.use('/api', api);

//Grabs our init-passport.js file. Important that we do this AFTER we initialized passport (lines 25-26)
var initPassport = require('./passport-init');
initPassport(passport);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

module.exports = app;