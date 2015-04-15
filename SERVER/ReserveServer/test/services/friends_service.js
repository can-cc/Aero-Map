var assert = require('assert'),
    User = require('../../models/user'),
    UserService = require('../../services/user'),
    FriendsService = require('../../services/friend'),
    randomstring = require('randomstring');

describe('Friends Module Service Test', function() {

    describe('#create friends request test', function() {
        it('should return success promise', function(done) {
          FriendsService.makeFriendRequest(1, 2).then(function(friendRequest){
            console.log('debug', 'make friends request success', friendRequest);
            done();
          }, function(error){
            console.error('error', error);
            throw error;
          });
        });
    });


});