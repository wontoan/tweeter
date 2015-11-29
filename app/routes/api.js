//Include express
var express = require("express");
//Defines as a router
var router = express.Router();

router.use(function(req, res, next){
  
  if (req.method === "GET") {
    return next();
  }
  
  if (req.isAuthenticated()) {
    // User is authenticated.
    return next();
  }
  
  //User is not authenticated. Redirect to login page
  return res.redirect('/#login');
  
});

router.route('/posts')
  
  //Create new post
  .post(function(req, res){
    res.send({message: 'TO DO: Create a new post in db'});
  })

  //Return all posts from db
  .get(function(req, res){
    res.send({message: "TO DO: Get all the posts in the database"});
  });

router.route('/posts/:id')
  
  //returns a particular post
  .put(function(req, res){
    return res.send({message: "TO DO: Modify an existing post with ID " + req.params.id});
  })
  .get(function(req, res){
    return res.send("TO DO: return post with ID " + req.params.id);
  })
  .delete(function(req, res){
    return res.send("TO DO: Delete post with ID " + req.params.id);
  });

//Export our api router so it can be used by app.js
module.exports = router;