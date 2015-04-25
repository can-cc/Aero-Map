var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    setting = require('./setting'),
    RedisStore = require('connect-redis')(session),
    cookieParser = require('cookie-parser'),
    setting = require('./setting'),
    app = express(),
    logger = require('./logger');


/*
 * Warning: "Corss Damin" very dangerous
 * Must only in develpment env
 */
var cors = require('cors');
app.use(cors());


/***********************************************
 * Setting
 ***********************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//csrf
app.set('csrfProtection', csrf({ cookie: true }));
app.set('parseForm', bodyParser.urlencoded({ extended: false }));

//session
app.use(session({
  store: new RedisStore(setting.redis_session),
  secret: 'keyboard cat'
}));


/***********************************************
 * Route
 ***********************************************/
//var middleware = require('./routes/middleware')
var UserRouter = require('./routes/user');
var MarkPost = require('./routes/markpost');

//only for development test
var TestRouter = require('./routes/test');

app.use(UserRouter);

app.use(TestRouter);


/***********************************************
 * Error Trace
 ***********************************************/

logger.log('info', 'current env =  ', app.get('env'));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({error: 'unknown!'});
    logger.log('error', err.message);
    logger.log('error', err);
  });
}


/***********************************************
 * Run
 ***********************************************/
var server = app.listen(3000, function () {
  var host = setting.host;
  var port = setting.port;
  console.log('Aero-Map App Main Server listening at http://%s:%s', host, port);
});


module.exports = app;






