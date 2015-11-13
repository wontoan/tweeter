'use strict';

(function () {
  var app = angular.module("userAuth", []);
  
  app.controller("AuthController", function() {
    this.user = {};
    
    this.error = "";
    
    this.login = function() {
      this.error = "Agasgsag";
    };
    
    this.register = function(){
      this.error = "Agasgsag";
    };
  });
  
})();