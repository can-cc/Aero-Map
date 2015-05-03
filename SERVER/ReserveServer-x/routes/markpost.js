var express = require('express'),
    router = express.Router(),
    MarkPostService = require('../services/markpost');

router.get('/api/markpost/:id', function(req, res, next){
  var id = req.params.id;

});


