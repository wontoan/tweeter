'use strict';

(function () {
  var app = angular.module("userAuth", []);
  
  app.controller("AuthController", function() {
    this.user = {};
    
    this.error = "";
    
    this.login = function() {
      this.error = "Login request for " + this.user.username;
    };
    
    this.register = function(){
      this.error = "Registration request for " + this.user.username;
    };
  });
  
})();