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

  //todo auth
    acceptFriendRequest: function(requestId) {
        return Bookshelf.transaction(function(transaction) {

            return new Promise(function(resolve, reject) {
                new FriendRequest({
                    id: requestId
                }).fetch().then(function(friendRequest) {
                    logger.log('info', 'accept friend request success', friendRequest);

                    var friendData = {
                        User_id: friendRequest.get('RequestUser_id'),
                        Friend_id: friendRequest.get('TarUser_id')
                    };


                    logger.log('info', 'friendData', friendData);

                    var antiFriendData = {
                        User_id: friendRequest.get('TarUser_id'),
                        Friend_id: friendRequest.get('RequestUser_id')
                    };


                    async.series([
                        function(callback) {
                            friendRequest.save({
                                status: 2
                            }, {
                                transacting: transaction
                            }).then(function(resp) {
                                callback(null, true);
                            }, function(error) {
                                transaction.rollback(error);
                                callback(error);
                            });
                        },
                        function(callback) {
                            new Friends(friendData).save(null, {
                                transacting: transaction
                            }).then(function(friend) {
                                callback(null, true);
                            }, function(error) {
                                logger.log('error', 'accept friend  request fail', 'create friend object fail', error);
                                transaction.rollback(error);
                                callback(error);
                            });
                        },
                        function(callback) {
                            new Friends(antiFriendData).save(null, {
                                transacting: transaction
                            }).then(function(friend) {
                                callback(null, true);
                            }, function(error) {
                                logger.log('error', 'accept friend  request fail', 'create friend object fail', error);
                                transaction.rollback(error);
                                callback(error);
                            });
                        },

                    ], function(error, results) {
                        if (error) {
                            logger.log('error', 'accept friends  transaction  Fail ', error);
                            transaction.rollback(error);
                            return reject(error);
                        }
                        return resolve(true);
                    });
                }, function(error) {

                });

            });

        });
    },


    /**********************************************
     * user requests which requested by other
     **********************************************/
    getRequests: function(userId) {
        return FriendRequest.collection()
            .query('where', 'TarUser_id', '=', userId)
        .query('where', 'status', '=', 1)
            .fetch({
              withRelated: ['requester']
            });
    },

    /**********************************************
     * user sended request
     **********************************************/
    seeRequests: function(userId) {
        return FriendRequest.collection()
            .query('where', 'RequestUser_id', '=', userId)
            .fetch();
    },

    rejectFriendRequest: function(requestId) {
        return new Promise(function(resolve, reject) {
            new FriendRequest({
                id: requestId
            }).fetch().then(function(friendRequest) {
                friendRequest.save({
                    status: 3
                }).then(function(resp) {
                    logger.log('info', 'reject friends request success', resp);
                    resolve(true);
                }, function(error) {
                    logger.log('error', 'reject friends request fail', error);
                    reject(error);
                });
            }, function(error) {
                logger.log('error', 'reject friends request fail', error);
                reject(error);
            });
        });
    },

    getUserFriend: function(userId, page) {
        logger.log('info', userId);
        var pagination = setting.Pagination.friendLoad,
            limit = pagination,
            offset = (page - 1) * pagination;
        return Friends.collection().query('where', 'User_id', '=', userId).query('limit', limit).query('offset', offset).fetch();
    },

    deleteFriend: function(userId, friendId) {
        return Bookshelf.transaction(function(transaction) {
            return new Promise(function(resolve, reject) {
                var friendsData = {
                        User_id: userId,
                        Friend_id: friendId
                    },
                    antiFriendsData = {
                        User_id: friendId,
                        Friend_id: userId
                    };

                async.series([
                    function(callback) {
                        new Friends(antiFriendsData).fetch().then(function(friend) {
                            friend.destroy().then(function(resp) {
                                callback(null, true);
                            }, function(error) {
                                transaction.rollback(error);
                                callback(error);
                            });
                        }, function(error) {
                            transaction.rollback(error);
                            callback(error);
                        });

                    },
                    function(callback) {
                        new Friends(friendsData).fetch().then(function(friend) {
                            friend.destroy().then(function(resp) {
                                callback(null, true);
                            }, function(error) {
                                transaction.rollback(error);
                                callback(error);
                            });
                        }, function(error) {
                            transaction.rollback(error);
                            callback(error);
                        });
                    }
                ], function(error, results) {
                    if (error) {
                        logger.log('error', 'delete friends relation fail', error);
                        transaction.rollback(error);
                        return reject(error);
                    }
                    return resolve(true);
                });

            });
        });
    },

  isFriend: function(userId, tarUserId){
    return new Promise(function(resolve, reject){
     new Friends({
       User_id: userId,
       Friends_id: tarUserId
     }).fetch().then(function(friendsRelation){
       logger.log('info', 'isFriends?', friendsRelation);
       if(friendsRelation){
         return resolve(true);
       }else {
         return resolve(false);
       }
     }, function(error){
       reject(error);
     }
);
    });
  },

    // deleteFriend: function(userId, friendId) {
    //     return new Promise(function(resolve, reject) {
    //         Bookshelf.transaction(function(transaction) {
    //             return new Promise(function(subresolve, subreject) {
    //                 var friendsData = {
    //                         User_id: userId,
    //                         TarUser_id: friendId
    //                     },
    //                     antiFriendsData = {
    //                         User_id: friendId,
    //                         TarUser_id: userId
    //                     };

    //                 async.series([
    //                     function(callback) {
    //                         new Friends(friendsData).destroy().then(function(resp) {
    //                             callback(null, true);
    //                         }, function(error) {
    //                             callback(error);
    //                         });
    //                     },
    //                     function(callback) {
    //                         new Friends(antiFriendsData).destroy().then(function(resp) {
    //                             callback(null, true);
    //                         }, function(error) {
    //                             callback(error);
    //                         });
    //                     }
    //                 ], function(error, results) {
    //                     if (error) {
    //                         logger.log('error', 'delete friends relation fail', error);
    //                         return subreject(error)
    //                     }
    //                     return subresolve(true);
    //                 });
    //             });
    //         });
    //     });
    // }



};

module.exports = FriendService;