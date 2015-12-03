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
  
  app.controller("mainController", function ($scope) {
    //Array for storing all posts
    $scope.posts = [{
      username: "David",
      message: "Hey what's up?",
      createdAt: Date.now()
    }];
    
    //Create blank 'new post' Object to be pushed to 'posts' array
    $scope.newPost = {};
    
    //Fill out 'new post' object
    $scope.addPost = function () {
      $scope.newPost.createdAt = Date.now();
      $scope.posts.push(this.newPost);
      $scope.newPost = {};
    };
  });
  
  app.controller("authController", function ($scope) {
    $scope.user = {};
    
    $scope.error = "";
    
    $scope.login = function () {
      $scope.error = "Login request for " + $scope.user.username;
    };
    
    $scope.register = function () {
      $scope.error = "Registration request for " + $scope.user.username;
    };
  });
  
})();