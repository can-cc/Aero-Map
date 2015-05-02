var orm = require('../db').orm;

var UserFriendsInfo = orm.Model.extend({
  tableName: 'UserFriendsInfo',

  idAttribute: 'User_id',

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserFriendsInfo;