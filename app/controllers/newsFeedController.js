(function() {
  var app = angular.module("newsFeed", []);

  app.controller("newsFeedController", function(){
    this.posts = posts;
  });
  
  app.controller("PostController", function(){

    this.post = {};
    
    this.addPost = function(){
      this.post.createdAt = Date.now();
      posts.push(this.post);
      this.post = {};
    };
  });
  
  var posts = [{
      username: "David",
      message: "Hey what's up?",
      createdAt: Date.now()
    }];
  
}());