var logger = require('../logger'),
    MarkPost = require('../models/markpost'),
    Comment = require('../models/markpost_comment'),
    Promise = require('bluebird'),
    knex = require('../db').knex;


var FriendService = {

  makeFriendRequest: function(reqUserId, tarUserId){

  },

  acceptFriendRequest: function(requestId){

  },

  rejectFriendRequest: function(requestId){

  },

  getUserFriend: function(userId, page){

  },

deleteFriend: function(userId,  friendId){
},

};

module.exports = FriendService;