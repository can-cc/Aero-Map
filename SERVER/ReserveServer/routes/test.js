var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend');


router.get('/test', function(req, res, next){
  res.send({
    a: '1',
    b: '2'
  });
});

module.exports = router;