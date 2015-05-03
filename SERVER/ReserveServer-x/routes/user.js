var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    passport = require('../auth/passport');


router.post('/logout', function(req, res, next) {
    req.session.destroy(function() {
        res.send({
            success: 'logout success!'
        });
    });
});

/*************************************
 * Login:
 * type  { 1:username, 2:email }
 ************************************/
router.post('/login', function(req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        type = req.body.type;

    if (type === 1) {
        UserService.loginByUserName(username, password, function(error, user) {
            if (error || user === null) {
                res.send({
                    error: 'username or password error!'
                });
            }
            res.send(user.omit('password'));
        });
    } else if (type === 2) {
        UserService.loginByEmail(username, password, function(error, user) {
            if (error || user === null) {
                res.send({
                    error: 'username or password error!'
                });
            }
            res.send(user.omit('password'));
        });
    } else {
        res.send({
            error: "login type error!"
        });
    }
});

/****************************************************
 * Login by Passport local Strategy
 ****************************************************/
router.post('/loginbypp',
    passport.authenticate('local', {
        failureFlash: true
    }),
    function(req, res) {
        res.send(req.user);
    }
);



router.post('/signin', function(req, res, next) {
    var userdata = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };


    UserService.signIn(userdata, function(error, user) {
        if (error || user === null) {
            /***********************************
             * Todo: specifically  error message
             ***********************************/
            res.status(500);
            res.send({
                error: 'sign in error!'
            });
        } else {
            res.send(user.omit('password'));
        }

    });
});

/*************************************************
 *User Avatar Router
 *************************************************/
router.get('/user/:id/avatar', function(req, res, next) {

});

router.post('/user/avatar', function(req, res, next) {

});

router.put('/user/:id/avatar', function(req, res, next) {

});

/*************************************************
 *User Detail Router
 *************************************************/

router.get('/user/:id/detail', function(req, res, next) {

});

router.post('/user/detail', function(req, res, next) {

});

router.put('/user/:id/detail', function(req, res, next) {

});

/*************************************************
 *User Infomation Router
 *************************************************/
router.get('/user/:id/info', function(req, res, next) {

});

router.post('/user/info', function(req, res, next) {

});

router.put('/user/:id/info', function(req, res, next) {

});

/*************************************************
 *User Setting Router
 *************************************************/

router.get('/user/:id/setting', function(req, res, next) {

});

router.put('/user/:id/setting', function(req, res, next) {

});

router.post('/user/setting', function(req, res, next) {

});

/*************************************************
 *User Friends router
 *************************************************/
router.get('/user/:id/friends', function(req, res, next) {

});

router.post('/user/friends', function(req, res, next) {

});

router.delete('/user/:id/friends/:friendId', function(req, res, next) {

});

module.exports = router;