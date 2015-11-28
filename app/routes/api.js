//Include express
var express = require("express");
//Defines as a router
var router = express.Router();

router.route('/posts')
      //returns all posts
      .get(function(req, res){
        res.send('TO DO: return all posts');
      })
      //Creates new post
      .post(function(req, res){
        res.send('TO DO: create a new post');
      });

//returns a particular post
router.route('/posts/:id')
    .get(function(req, res){
      res.send("TO DO: return post with ID " + req.params.id);
    })
    .delete(function(req, res){
      res.send("TO DO: Add/Modify post with ID " req.params.id);
    });

//Export our api router so it can be used by app.js
module.exports = router;