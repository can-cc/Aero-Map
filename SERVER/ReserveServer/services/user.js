var logger = require('../logger'),
    User = require('../models/user'),
    UserDetail = require('../models/userdetail'),
    Promise = require('bluebird'),
    async = require("async"),
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



  /**************************************************
   * @deprecated!
   *
   **************************************************/
    signIn: function(data, callback) {
        bcrypt.genSalt(11, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                //data.password = hash
                new User(data).save({
                    password: hash
                }).then(function(user) {
                  logger.log('debug', user);
                    callback(null, user);
                }, function(error) {
                  logger.log('error', error);
                  callback(error);
                });
            });
        });
    },

  createUser : function(data, outCallback){
    return Bookshelf.transaction(function(transaction){
      return new Promise(function(resolve, reject){
        async.waterfall([
          //create user
          function(callback){
            bcrypt.genSalt(11, function(err, salt) {
              bcrypt.hash(data.password, salt, function(err, hash) {
                //data.password = hash
                new User(data).save({
                  password: hash
                }).then(function(user) {
                  logger.log('debug', user);
                  callback(null, user.get('id'));
                }, function(error) {
                  logger.log('error', error);
                  callback(error);
                });
              });
            });
          },
          //create user setting(default)
          function(user,callback){

          },
          //create user infomation(default)
          function(callback){

          },
          //create user setting(default)
          function(callback){

          },
          //create user friendinfo(default)
          function(callback){

          }
        ], function(error, result){

        });
      });
    });

  },


    loginByUserName: function(username, password, callback) {
        if (!username || !password) throw new Error('Username and password are both required!');
        new User({
            username: username
        }).fetch({
            require: true
        }).then(function(user) {
            bcrypt.compare(password, user.get('password'), function(err, res) {
                if (err) callback(err);
                if (res) return callback(null, user);
                return callback(null, null);
            });
        }, function(err) {
            callback(err);
        });
    },

    loginByEmail: function(email, password, callback) {
        if (!email || !password) throw new Error('Email and password are both required!');
        new User({
            email: email
        }).fetch({
            require: true
        }).then(function(user) {
            bcrypt.compare(password, user.get('password'), function(err, res) {
                if (err) callback(err);
                if (res) return callback(null, user);
                return callback(null, null);
            });
        }, function(err) {
            callback(err);
        });
    }


};

module.exports = UserService;