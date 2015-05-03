var assert = require('assert'),
    User = require('../../models/user'),
    UserService = require('../../services/user'),
    FriendsService = require('../../services/friend'),
    randomstring = require('randomstring');

describe('Friends Module Service Test', function() {
    var requestId = 3;
    var rejectRequestId = 5;
    var userId = 1;
    var TarUserId = 2;

    describe.skip('#create friends request test', function() {
        it('should return success promise', function(done) {
            FriendsService.makeFriendRequest(1, 2).then(function(friendRequest) {
                console.log('debug', 'make friends request success', friendRequest);
                done();
            }, function(error) {
                console.error('error', error);
                throw error;
            });
        });
    });

    describe.skip('#accept friends request', function() {
        it('should return success promise', function(done) {
            FriendsService.acceptFriendRequest(requestId).then(function(resp) {
                console.log('debug', resp);
                done();
            }, function(error) {
                console.log('debug', error);
                throw error;
            });
        });

    });

    describe.skip('#reject friends request', function() {
        it('should return success promise', function(done) {
            FriendsService.rejectFriendRequest(rejectRequestId).then(function(resp) {
                console.log('debug', resp);
                done();
            }, function(error) {
                throw error;
            });
        });
    });

    describe('#user get himself request list', function() {
        it('should return success promise', function(done) {
            var test = FriendsService.seeRequests(userId).then(function(resp) {
                //            console.log('info', 'success', resp);
                resp.forEach(function(item) {
                    console.log(item);
                });
                done();
            }, function(error) {
                console.log('error', error);
                throw error;
            });
        });
    });

    describe('#user get request which sended from other', function() {
        it('should return success promise', function(done) {
            FriendsService.getRequests(TarUserId).then(function(resp) {
                console.log('debug', resp);
                done();
            });
        });
    });


    describe('#get friends', function() {
        it('should return success promise', function(done) {
            FriendsService.getUserFriend(userId, 1).then(function(resp) {
                console.log('debug', resp);
                done();
            });
        });
    });

    describe('#delete friends', function() {
        it('should return success promise', function(done) {
            FriendsService.deleteFriend(userId, TarUserId).then(function(resp) {
                console.log('debug', resp);
                done();
            });
        });
    });

});