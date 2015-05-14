var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    app = require('../app');


router.get('/api/markpost/timeline', function(req, res, next){

});

router.get('/api/markpost/place', function(req, res, next){

});

//@@deprecated
router.get('/api/place/user', function(req, res, next){

});

router.get('/api/user/markposts', function(req, res, next){

});

module.exports = router;