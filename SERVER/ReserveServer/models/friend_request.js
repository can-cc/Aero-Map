var orm = require('../db').orm,
    Checkit = require('checkit'),
    logger = require('../logger'),
    Promise = require('bluebird'),
    Friends = require('./friends'),
    UserDetail = require('./userdetail'),
    knex = require('../db').knex;


var FriendRequest = orm.Model.extend({
    tableName: 'FriendRequest',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return Checkit({
            RequestUser_id: 'required',
            TarUser_id: 'required'
        }).run(this.attributes);
    },

  requester: function(){
    return this.belongsTo(UserDetail, 'RequestUser_id');
  },

  // targeter: function(){
  //   return this.hasOne(User);
  // },

    hasTimestamps: ['created_at', 'updated_at']
});

module.exports = FriendRequest;