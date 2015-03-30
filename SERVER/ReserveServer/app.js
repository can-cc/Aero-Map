var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    setting = require('./setting'),
    RedisStore = require('connect-redis')(session),
    setting = require('./setting')
    app = express()

/***********************************************
 * Setting
 ***********************************************/


/***********************************************
 * Route
 ***********************************************/
//var middleware = require('./routes/middleware')
var post = require('./routes/post')


/***********************************************
 * Run
 ***********************************************/
var server = app.listen(3000, function () {
  var host = setting.host
  var port = setting.port
  console.log('Aero-Map App Main Server listening at http://%s:%s', host, port)
})









