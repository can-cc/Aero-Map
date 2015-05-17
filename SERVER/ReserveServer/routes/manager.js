var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    User = require('../models/user'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    passport = require('../auth/passport'),
    logger = require('../logger');


router.get('/check/:username', function(req, res, next ){
  var username = req.params.username;
  new User({
    username: username
  }).fetcn().then(function(user){
    if (user) {
      res.send({
        exist: true
      });
    } else {
      res.send({
        exist: false
      });
    }
  }, function(error){
    next(error);
  });
});

router.get('/check/:email', function(req, res, next ){
  var email = req.params.email;
  new User({
    email: email
  }).fetcn().then(function(user){
    if (user) {
    res.send({
        exist: true
      });
    } else {
      res.send({
        exist: false
      });
    }
  }, function(error){
    next(error);
  });
});

module.exports = router;