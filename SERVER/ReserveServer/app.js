var express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    https = require('https'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    setting = require('./setting'),
    RedisStore = require('connect-redis')(session),
    cookieParser = require('cookie-parser'),
    csrf = require('csurf'),
    setting = require('./setting'),
    flash = require('connect-flash'),
    passport = require('./auth/passport'),
    app = express(),
    captcha = require('captcha'),
    logger = require('./logger');



/***********************************************
 * Important Note:!
 * Warning: "Corss Damin" very dangerous
 * Must only in develpment env
 ***********************************************/
var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4400',
    credentials: true
}));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

/***********************************************
 * Configure
 ***********************************************/
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

//csrf
app.set('csrfProtection', csrf({
    cookie: true,
    value: function(req) {
        return req.body._csrf;
    }
}));
app.set('parseForm', bodyParser.urlencoded({
    extended: false
}));

app.use(multer({
    dest: './upload',

    changeDest: function(dest, req, res) {
        if (req.url === '/markpost/uploadimg') {
            return dest + '/temp';
        }
        return dest;
    },

    rename: function(fieldname, filename, req, res) {
        return filename + new Date().toString().slice(0, 24).replace(/\s+/g, '');
    },
    onFileUploadStart: function(file, req, res) {
        //Todo:
        //should use Debug
        //console.log(file.fieldname + ' uploaded to  ' + file.path)
    },
    onFileUploadComplete: function(file, req, res) {
        //console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));

//session
app.use(session({
    store: new RedisStore(setting.redis_session),
    secret: 'LoveRaspberryPi',
    name: 'sessionid22'
}));

//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//captcha
app.use(captcha({
    url: '/captcha.jpg',
    color: '#0064cd',
    background: 'rgb(20,30,200)'
})); // captcha params
app.use('/templates', express.static('templates'));
app.use('/upload', express.static('upload'));
app.use('/app2', express.static('../../APP-Angular/www'));
module.exports = app;

/***********************************************
 * Route
 ***********************************************/
//var middleware = require('./routes/middleware')
var UserRouter = require('./routes/user');
var MarkPostRouter = require('./routes/markpost');
var FriendRouter = require('./routes/friend');
var ManagerRouter = require('./routes/manager');
var ApiRouter = require('./routes/api');

//only for development test
var TestRouter = require('./routes/test');

app.use(UserRouter);
app.use(MarkPostRouter);
app.use(FriendRouter);
app.use(ManagerRouter);
app.use(ApiRouter);
app.use(TestRouter);

/****************************************************
 * Socket
 ****************************************************/
var chatsocket = require('./socket/chat');

/***********************************************
 * Error Trace
 ***********************************************/

logger.log('info', 'current env =  ', app.get('env'));

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            error: 'unknown!'
        });
        logger.log('error', err.message);
        logger.log('error', err);
    });
}

/***********************************************
 * Run
 * Choose https or http by setting.https(boolean)
 ***********************************************/
if (setting.https) {
    https.createServer({
        key: fs.readFileSync('cert/test/server.key'),
        cert: fs.readFileSync('cert/test/server.crt'),
        passphrase: '123456'
    }, app).listen(setting.https_options.port);
} else {
    var server = http.createServer(app);
    server.listen(setting.port);
    console.log('Aero-Map App Main Server listening at http://%s:%s', setting.host, setting.port);
  chatsocket.listen(server);
}
