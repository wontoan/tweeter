'use strict';
(function () {
  var app = angular.module("newsFeed", []);
  
  var posts = [{
      username: "David",
      message: "Hey what's up?",
      createdAt: Date.now()
    }];

  app.controller("NewsFeedController", function () {
    this.posts = posts;
  });
  
  app.controller("PostController", function () {

    this.post = {};
    
    this.addPost = function () {
      this.post.createdAt = Date.now();
      posts.push(this.post);
      this.post = {};
    };
  });
})();