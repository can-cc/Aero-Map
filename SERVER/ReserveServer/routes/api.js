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
  MarkPostService.getUserMarkpost(userId, function(error, userWithMarkpost){
    if(error){return next(error)}
    if(userWithMarkpost){
      res.send(userWithMarkpost);
    } else {
      res.status(404).send({
        error: 'not found!'
      });
    }
  });
});

module.exports = router;