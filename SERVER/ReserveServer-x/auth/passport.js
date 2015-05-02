var passport = require('passport'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy,
    UserService = require('../services/user');

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  UserService.getUser(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(nameOrEmail, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.

      if(nameOrEmail.indexOf('@')){
        var email = nameOrEmail;
        UserService.loginByEmail(email, password, function(error, user) {
          if (error || user === null) {
            done(error || new Error('Unknown email' + email));
          }
          return done(null, user.omit('password'));
        });
      } else{
        var username = nameOrEmail;
        UserService.loginByUserName(username, password, function(error, user) {
          if (error || user === null) {
            done(error || new Error('Unknown user' + email));
          }
          return done(null, user.omit('password'));
        });
      }
    });
  }
));


module.exports = passport;