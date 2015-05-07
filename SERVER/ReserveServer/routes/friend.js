var express = require('express'),
    router = express.Router(),
    setting = require('../setting'),
    UserService = require('../services/user'),
    FriendService = require('../services/friend'),
    app = require('../app');

router.get('/friend/request/:userId', function(req, res, next) {
    if (!req.session.user) {
        return next(new Error('not loing'));
    }
    var reqUserId = req.session.user.id,
        tarUserId = req.params.userId;
    FriendService.makeFriendRequest(reqUserId, tarUserId)
        .then(function(friendRequest) {
            res.send(friendRequest);
        }, function(error) {
            next(error);
        });
});

router.get('/friend/reqmsg', function(req, res, next) {
    if (!req.session.user) {
        return next(new Error('not loing'));
    }
    FriendService.getRequests(req.session.user.id).then(function(requests) {
        res.send(requests);
    }, function(error) {
        return next(error);
    });
});

router.post('/friend/accept', function(req, res, next) {
    if (!req.session.user) {
        return next(new Error('not loing'));
    }
    var requestId = req.body.requestId,
        userId = req.session.id;
    //Todo auth
    FriendService.acceptFriendRequest(requestId).then(function(boolean) {
        if (boolean)
            res.send({
                success: 'success'
            });
    }, function(error) {
        return next(error);
    });
});

router.get('/user/:id/friends/:page', function(req, res, next) {
    if (!req.session.user) {
        return next(new Error('not loing'));
    }
    var userId = req.params.id,
        page = req.params.page;
    FriendService.getUserFriend(userId, page).then(function(friends) {
        res.send(friends);
    }, function(error) {
        return next(error);
    });

});

router.get('/friendservice', function(req, res, next) {
    var userId = req.query.userId,
        tarUserId = req.query.tarUserId;
    FriendService.isFriend(userId, tarUserId).then(function(resp) {
        res.send({
            isFriend: resp
        });
    }, function(error) {
        res.send({
            isFriend: resp
        });
    });
});

router.post('/user/:userId/friend/:friendId/delete', function(req, res, next) {
    if (!req.session.user) {
        return next(new Error('not loing'));
    }
    FriendService.deleteFriend(req.params.userId, req.params.friendId)
        .then(function(resp) {
            res.send({
                result: resp
            });
        }, function(error) {
            next(error);
        });
});

module.exports = router;