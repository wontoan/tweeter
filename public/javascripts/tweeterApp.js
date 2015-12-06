(function () {
  'use strict';
  var app = angular.module("tweeterApp", ['ngRoute', 'ngResource']).run(function ($rootScope, $http) {
    $rootScope.authenticated = false;
    $rootScope.current_user = "";
    
    $rootScope.signout = function () {
      $http.get('/auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = "";
    };
  });
  
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
    
      .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'authController'
      });
  });
  
  app.factory('postService', function ($resource) {
    return $resource('api/posts/:id');
  });
  
  app.controller("mainController", function (postService, $scope, $rootScope) {
    $scope.posts = postService.query();
    $scope.newPost = {text: '', created_by: '', created_at: ''};
    
    //Fill out 'new post' object
    $scope.addPost = function () {
      $scope.newPost.created_by = $rootScope.current_user;
      $scope.newPost.created_at = Date.now();
      console.log($scope.newPost);
      postService.save($scope.newPost, function () {
        $scope.posts = postService.query();
        $scope.newPost = {text: '', created_by: '', created_at: ''};
      });
    };
  });
  
  app.controller("authController", function ($scope, $rootScope, $http, $location) {
    $scope.user = {username: '', password: ''};
    $scope.error = "";
    
    $scope.login = function () {
      $http.post('/auth/login', $scope.user).success(function (data) {
        if (data.state === 'success') {
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $location.path('/');
        } else {
          $scope.error = data.message;
        }
      });
    };
    
    $scope.register = function () {
      $http.post('/auth/signup', $scope.user).success(function (data) {
        if (data.state === 'success') {
          $rootScope.authenticated = true;
          //console.log(data);
          $rootScope.current_user = data.user.username;
          $location.path('/');
        } else {
          $scope.error = data.message;
        }
      });
    };
  });
})();