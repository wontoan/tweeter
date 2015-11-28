var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

//temp storage that will later be replaced by mongodb
var users = {};

module.exports = function(passport){

    // In order to support login sessions, Passport will serialize and deserialize user instances to and from the session. See passport docs for more info
    passport.serializeUser(function(user, done) {
        console.log('serializing user:', user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        return done(null, users[username]);

    });

  //User login Strategy
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
      function(req, username, password, done) {
        // Check if the username does not exist
        if(!users[username]) {
          return done('Username not found', false);
        }
        //Check if the password is incorrect
        if (!isValidPassword(users[username], password)) {
          return done('Password is incorrect. Please try again', false);
        }
      
      // Passport-required 'verify callback'
      // Successfully logged in
        return done(null, users[username]);
      }
    ));
  //User signup strategy
    passport.use('signup', new LocalStrategy({
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
      function(req, username, password, done) {
      //check if user already exists
        if(users[username]) {
          return done('That username has already been taken :(', false);
        }
      //Otherwise add user to db
        users[username] = {
          username: username,
          password: createHash(password);
        };
      // Passport-required 'verify callback'
        return done(null, users[username]);
      })
    );

  //Check for correct password by comparing hash
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
  
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};