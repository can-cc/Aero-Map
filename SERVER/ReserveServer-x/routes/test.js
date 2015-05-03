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

router.get('/test/captcha', function(req, res){
  res.type('html');
  res.end('<img src="/captcha.jpg"/><form action="/test/login" method="post"><input type="text" name="digits"/></form>'); // captcha render
});

router.post('/test/login', function(req, res){
  res.type('html');
  res.end('CONFIRM: ' + (req.body.digits == req.session.captcha)); // captcha verify
});

module.exports = router;