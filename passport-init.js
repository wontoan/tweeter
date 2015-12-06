var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

//    In order to support login sessions, Passport will de/serialize user instances to and from the session. See passport docs for more info
  passport.serializeUser(function (user, done) {
      //Mongodb automatically generates an _id for every object
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

//USER LOGIN STRATEGY
  passport.use('login', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, username, password, done) {
    
      User.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err);
        }

        //If no user with this username, login fail
        if (!user) {
          return done(null, false, {message: "Incorrect username!"});
        }

        //If wrong password, login fail
        if (!isValidPassword(user, password)) {
          return done(null, false, {message: "Incorrect password!"});
        }

        return done(null, user);
      });
    }));
  
//USER SIGNUP STRATEGY
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
      User.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err);
        }

        //If user already signed up
        if (user) {
          return done(null, false);
        } else {
          var newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            console.log(newUser.username + ' registration successful!');
            return done(null, newUser);
          });
        }
      });
    })
  );
  
  //Check for correct password by comparing hash
  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};