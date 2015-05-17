var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    MarkPostService = require('../services/markpost'),
    FriendService = require('../services/friend'),
    app = require('../app');


router.get('/api/markpost/timeline', function(req, res, next){
  MarkPostService.getTimeLine().then(function(markposts){
    res.send(markposts);
  }, function(error){
    next(error);
  });
});

router.get('/api/markpost/place', function(req, res, next){
  var coords = {
    longitude: req.query.longitude,
    latitude: req.query.latitude
  };
  MarkPostService.getAreaMarkersRaw(coords, 5)
    .then(function(markposts) {
      res.send(markposts.rows);
    }, function(error) {
      next(error);
    });
});

//@@deprecated
router.get('/api/place/user', function(req, res, next){
  var coords = {
    longitude: req.query.longitude,
    latitude: req.query.latitude
  };
  MarkPostService.getPlaceUser(function(markposts){
    res.send(markposts);
  }, function(error){
    next(error);
  });
});

router.get('/api/user/:userId/markposts', function(req, res, next){
  var userId = req.params.userId;
  console.log(userId);
  UserService.getUser(userId, function(error, user){
    return user.fetch({
      withRelated: ['markposts', 'detail']
    }).then(function(user_markposts_detail){
      res.send(user_markposts_detail);
      console.log(user_markposts_detail);
    }, function(error){
      next(error);
    });
  });
});

module.exports = router;