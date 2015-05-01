var express = require('express'),
    router = express.Router(),
    MarkPostService = require('../services/markpost'),
    logger = require('../logger');

router.get('/markpost/:id', function(req, res, next){
  var id = req.params.id;
  MarkPostService.getMarkPointById(id).then(function(markpost){
    res.json(markpost);
    res.end();
  }, function(error){
    next(error);
  });
});

router.post('/markposts', function(req, res, next){

});

router.post('/markpost/uploadimg', function(req, res, next){
  logger.log('info', JSON.stringify(req.cookies));
  logger.log('info', JSON.stringify(req.session.user));
  if(!req.session.user){
    return res.send({error: 'not login!'});
  } else {
    var keys = [];
    for (var key in req.files) {
      keys.push(key);
    }
    //I only want first element, may be can opti..
    console.log('debug', req.session.user);
    req.session.uploadPic = req.files[keys[0]].path;
    console.log('debug', req.files[keys[0]]);
    res.send({
      src: req.files[keys[0]].path
    } || {
      Error: 'unkown!'
    });
    res.end();
  }

});

module.exports = router;

