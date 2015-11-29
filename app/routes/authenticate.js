var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  //sends successful login back to angular
  router.get('/success', function(req, res){
    res.send({state: 'success', user: req.user ? req.user : null});
  });
  
  //sends failed login back to angular
  router.get('/failure', function(req, res){
    res.send({state: 'failure', user: null, message: 'Invalid username or password'});
  });
  
  //Login
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/sucess',
    failureRedirect: '/auth/failure'
  }));
  
  //Sign-up
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }));
  
  //Log-out
  router.get('/signout', function(req, res){
    req.logout(); // This is Passport's function for terminating a login session
    res.redirect('/');
  });
  return router;
};