(function () {
  'use strict';
  var app = angular.module("tweeterApp", ['ngRoute']);
  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'mainController'
      })
    
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'authController'
      })
    
      .when('/register', {
        templateUrl: 'register.html',
        controller: 'authController'
      });
  });
  
  app.controller("mainController", function () {
    //Array for storing all posts
    var posts = [{
      username: "David",
      message: "Hey what's up?",
      createdAt: Date.now()
    }];
    
    //Create blank 'new post' Object to be pushed to 'posts' array
    this.newPost = {};
    
    //Fill out 'new post' object
    this.addPost = function () {
      this.newPost.createdAt = Date.now();
      posts.push(this.post);
      this.newPost = {};
    };
  });
  
  app.controller("authController", function () {
    this.user = {};
    
    this.error = "";
    
    this.login = function () {
      this.error = "Login request for " + this.user.username;
    };
    
    this.register = function () {
      this.error = "Registration request for " + this.user.username;
    };
  });
  
})();