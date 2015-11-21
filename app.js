var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var api = require('./routes/api');
//var authenticate = require('./routes/authenticate');

app.use(express.static(path.join(__dirname + 'public')));

app.use('/api', api);
//app.use('/auth', authenticate);

app.listen(3000);