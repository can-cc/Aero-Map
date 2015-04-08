var logger = require('../logger'),
    User = require('../models/user'),
    UserDetail = require('../models/usersdetail');
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
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash
                new User(data).save().then(function(user) {
                    callback(null, user);
                }, function(error) {
                    callback(error);
                });
            });
        });

    },


    loginByUserName: Promise.method(function(username, password, callback) {
        if (!username || !password) throw new Error('Username and password are both required!');
        return new User({
            username: username
        }).fetch({
            require: true
        }).tap(function(user) {
            return bcrypt.compareAsync(user.get(password), password);
        });
    }),

    loginByEmail: Promise.method(function(email, password, callback) {
        if (!email || !password) throw new Error('Email and password are both required!');
        return new User({
            email: email
        }).fetch({
            require: true
        }).tap(function(user) {
            return bcrypt.compareAsync(user.get(password), password);
        });
    })


}