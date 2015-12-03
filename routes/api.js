//Include express
var express = require("express");
//Defines as a router
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function isAuthenticated(req, res, next) {
  if (req.method === "GET") {
    return next();
  }
  
  if (req.isAuthenticated()) {
    // User is authenticated.
    return next();
  } else {
    res.redirect('/#login');
  }
}

router.get('/', function (req, res) {
  res.sendFile(express.static(__dirname + '/public/index.html'));
});

router.use('/posts', isAuthenticated);

router.route('/posts')
  
  //Create new post
  .post(function (req, res) {
    var post = new Post();
    post.text = req.body.text;
    post.created_by = req.body.created_by;
    post.save(function (err, post) {
      if (err) {
        return res.send(500, err);
      }
      return res.json(post);
    });
  })

  //Return all posts from db
  .get(function (req, res) {
    Post.find(function (err, posts) {
      if (err) {
        return res.send(500, err);
      }
      return res.send(200, posts);
    });
  });

router.route('/posts/:id')
  
  //updates a particular twit/post
  .put(function (req, res) {
    Post.findById(req.params.id, function (err, post) {
      if (err) {
        res.send(err);
      }
      post.created_by = req.body.created_by;
      post.text = req.body.text;
      
      post.save(function (err, post) {
        if (err) {
          res.send(err);
        }
        res.json(post);
      });
    });
  })
  //Returns specified twit/post
  .get(function (req, res) {
    Post.findById(req.params.id, function (err, post) {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  })
  //deletes the twit/post
  .delete(function (req, res) {
    Post.remove({
      _id: req.params.id
    }, function (err) {
      if (err) {
        res.send(err);
      }
      res.json("post was deleted");
    });
  });

//Export our api router so it can be used by app.js
module.exports = router;