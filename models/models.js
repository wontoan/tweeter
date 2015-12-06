var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
  text: String,
  created_by: {type: Schema.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now}
});

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: {type: Date, default: Date.now}
});

//Declare models
mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);