var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    passport = require('../auth/passport'),
    logger = require('../logger');


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
        password = req.body.password;

    if (username.indexOf('@') < 0 ) {
        UserService.loginByUserName(username, password, function(error, user) {
            if (error || user === null) {
                res.send({
                    error: 'username or password error!'
                });
            }
          req.session.user = user.omit('password');
            res.send(user.omit('password'));
        });
    } else {
        UserService.loginByEmail(username, password, function(error, user) {
            if (error || user === null) {
                res.send({
                    error: 'username or password error!'
                });
            }
          req.session.user = user.omit('password');
          res.send(user.omit('password'));
        });
    }
});

/****************************************************
 * Login by Passport local Strategy
 ****************************************************/
// router.post('/loginbypp',
//     passport.authenticate('local', {
//         failureFlash: true
//     }),
//     function(req, res) {
//       logger.log('debug', JSON.stringify(req.body));
//       res.send(req.user);
//     }
// );

router.post('/loginbypp', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      /* something */
    }
    if (user) {
      req.logIn(user, function (err) {
      // req.session.user = user;
        /* something */
      });
    }
    // req.session.user = user;
    res.json({ state: req.isAuthenticated() });
  })(req, res, next);
});
/****************************************************
 * @Sign in
 ****************************************************/

router.post('/signin', function(req, res, next) {
    var userdata = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
  logger.log('info', userdata);
    // UserService.signIn(userdata, function(error, user) {
    //     if (error || user === null) {
    //         /***********************************
    //          * Todo: specifically  error message
    //          ***********************************/
    //         res.status(500);
    //         res.send({
    //             error: 'sign in error!(unknown)'
    //         });
    //     } else {
    //         res.send(user.omit('password'));
    //     }
    // });
    UserService.createUser(userdata).then(function(user) {
        if (user) {
            res.send(user.omit('password'));
        } else {
            res.status(500);
            res.send({
                error: 'sign in error!(unknown)'
            });
        }
    }, function(error) {
        res.status(500);
        res.send({
            error: 'sign in error!(unknown)'
        });
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

/****************************************************
 * Test
 ****************************************************/
router.get('/some-form2', function(req, res) {
  res.send('<form action="/login" method="POST">' +
           'Favorite color: <input type="text" name="username">' +
           'Favorite color: <input type="text" name="password">' +
           '<button type="submit">Submit</button>' +
           '</form>');
});

router.get('/user/test', function(req, res){
  //res.send(req.session.user);
  res.json(req.session.user);
});

module.exports = router;