var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    app = require('../app');

router.get('/friend/request/:userId', function(req, res, next){
  if(!req.session.user){
    return next(new Error('not loing'));
  }
  var reqUserId = req.session.user.id,
      tarUserId = req.params.userId;
  FriendService.makeFriendRequest(reqUserId, tarUserId)
  .then(function(friendRequest){
    res.send(friendRequest);
  }, function(error){
    next(error);
  });
});

router.get('/friend/reqmsg', function(req, res, next){
  if(!req.session.user){
    return next(new Error('not loing'));
  }
  FriendService.getRequests(req.session.user.id).then(function(requests){
    res.send(requests);
  }, function(error){
    return next(error);
  });
});

module.exports = router;