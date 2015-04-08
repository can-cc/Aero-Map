var logger = require('../logger'),
    User = require('../models/user'),
    UserDetail = require('../models/userdetail');
    Promise = require('bluebird'),
    bcrypt = require('bcrypt');

var UserService = {

    getUser: function(userId, callback) {
        new User({
            id: userId
        }).fetch(function(user) {
            callback(null, user);
        }, function(error) {
            callback(error);
        });
    },

  getUserDetail: function(userDetailId) {
    new UserDetail({
      id: userId
    }).fetch(function(user) {
      callback(null, user);
    }, function(error) {
      callback(error);
    });
  },

    signIn: function(data, callback) {
        bcrypt.genSalt(11, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                //data.password = hash
                new User(data).save({
                  password: hash
                }).then(function(user) {
                    callback(null, user);
                }, function(error) {
                    callback(error);
                });
            });
        });

    },


    loginByUserName: Promise.method(function(username, password) {
        if (!username || !password) throw new Error('Username and password are both required!');
        return new User({
            username: username
        }).fetch({
            require: true
        }).tap(function(user) {
          console.log('debug', password);
          console.log('debug',  user.get('password'));
          console.log('debug', bcrypt.compareAsync(password, user.get('password')));
          return bcrypt.compareAsync(password, user.get('password'));
        });
    }),

    loginByEmail: Promise.method(function(email, password) {
        if (!email || !password) throw new Error('Email and password are both required!');
        return new User({
            email: email
        }).fetch({
            require: true
        }).tap(function(user) {
          return bcrypt.compareAsync(password, user.get('password'));
        });
    })
}

module.exports = UserService;