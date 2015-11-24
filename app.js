var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//var api = require('./routes/api');
//var authenticate = require('./routes/authenticate');

app.use('/controllers', express.static(__dirname + '/app/controllers/'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/public/views'));

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