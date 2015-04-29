var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    app = require('../app');

var csrfProtection = app.get('csrfProtection');
var parseForm = app.get('parseForm');

router.get('/test', function(req, res, next) {
    res.send({
        a: '1',
        b: '2'
    });
});

router.get('/test/captcha', function(req, res) {
    res.type('html');
    res.end('<img src="/captcha.jpg"/><form action="/test/login" method="post"><input type="text" name="digits"/></form>'); // captcha render
});

router.post('/test/login', function(req, res) {
    res.type('html');
    res.end('CONFIRM: ' + (req.body.digits == req.session.captcha)); // captcha verify
});

router.get('/test/csrf', function(req, res) {
    //  res.cookie('_csrf', req.csrfToken());
    // res.send('<a href="/test/csrf">csrf</a>');
    res.send({
        csrf: req.csrfToken()
    });
});

router.post('/test/csrf', csrfProtection, function(req, res) {
    res.send({
        csrfToken: req.csrfToken()
    });
});

router.get('/some-form', csrfProtection, function(req, res) {
    res.send('<form action="/process" method="POST">' +
        '<input type="hidden" name="_csrf" value="' + req.csrfToken() + '">' +
        'Favorite color: <input type="text" name="favoriteColor">' +
        '<button type="submit">Submit</button>' +
        '</form>' +
        req.csrfToken());
});

router.post('/process', csrfProtection, function(req, res) {
    res.send('<p>Your favorite color is "' + JSON.stringify(req.body) + '".');
});

router.post('/json', function(req, res, next){
  res.json(req.body);
});

module.exports = router;