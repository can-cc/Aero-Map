var logger = require('../logger'),
    Friends = require('../models/friends'),
    FriendRequest = require('../models/friend_request'),
    Promise = require('bluebird'),
    Bookshelf = require('../db').orm,
    knex = require('../db').knex,
    setting = require('../setting'),
    async = require('async');


var FriendService = {

    makeFriendRequest: function(reqUserId, tarUserId) {
        //var dateTime = new Date().toJSON();
        return new Promise(function(resolve, reject) {
            new FriendRequest({
                RequestUser_id: reqUserId,
                TarUser_id: tarUserId
            }).save().then(function(friendRequest) {
                logger.log('info', 'create friends request success', friendRequest);
                resolve(friendRequest);
                /***********************************
                 * Todo: if user online , emit request event
                 ***********************************/
            }, function(error) {
                logger.log('error', 'create friends request fail', error);
                reject(error);
            });
        });
    },

    acceptFriendRequest: function(requestId) {
        return new Promise(function(resolve, reject) {
            new FriendRequest({
                id: requestId
            }).save({
                //code 2 is accept
                status: 2
            }).then(function(friendRequest) {
                logger.log('info', 'accept friend request success', friendRequest);

                var friendData = {
                    User_id: friendReques.RequestUser_id,
                    Friedn_id: friendReques.TarUser_id
                };

                var antiFriendDate = {
                    User_id: friendRequest.TarUser_id,
                    Friend_id: friendRequest.RequestUser_id
                };

                /*
                 * Transaction! create two friends rows
                 */
                Bookshelf.transaction(function(transaction) {
                    return new Friends.collection([friendData, antiFriendDate]).save(null, {
                        transaction: transaction
                    });
                }).then(function(friends) {
                    logger.log('info', 'create friend relation success', friends);
                    resolve(friends);
                }, function(error) {
                    logger.log('error', 'create friend relation fail', error);
                    reject(error);
                });

            }, function(error) {
                logger.log('error', 'accept friend request fail', error);
                reject(error);
            });
        });
    },

    getRequests: function(userId) {
        return new FriendRequest.collection({
            User_id: userId
        }).fetch();
    },

    rejectFriendRequest: function(requestId) {
        return new FriendRequest({
            id: requestId
        }).save({
            status: 3
        });
    },

    getUserFriend: function(userId, page) {
        var pagination = setting.Pagination.friendLoad,
            limit = pagination,
            offset = (page - 1) * pagination;
        return Friends.collection({
            User_id: userId
        }).query('limit', limit).query('offset', offset).fetch();
    },

    deleteFriend: function(userId, friendId) {
        return new Promise(function(resolve, reject) {
            Bookshelf.transaction(function(transaction) {
                return new Promise(function(subresolve, subreject) {
                    var friendsData = {
                            User_id: userId,
                            TarUser_id: friendId
                        },
                        antiFriendsData = {
                            User_id: friendId,
                            TarUser_id: userId
                        };

                    async.series([
                        function(callback) {
                          new Friends(friendsData).destroy().then(function(resp){
                            callback(null, true);
                          }, function(error){
                            callback(error);
                          });
                        },
                        function(callback) {
                          new Friends(antiFriendsData).destroy().then(function(resp){
                            callback(null, true);
                          }, function(error){
                            callback(error);
                          });
                        }
                    ], function(error, results) {
                        if (error) {
                            logger.log('error', 'delete friends relation fail', error);
                            return subreject(error)
                        }
                        return subresolve(true);
                    });
                });

            });
        });

    }


};

module.exports = FriendService;