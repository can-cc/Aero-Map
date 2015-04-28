var orm = require('../db').orm;

var UserInfomation = orm.Model.extend({
  tableName: 'UserInfomation',

  idAttribute: 'User_id',

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserInfomation;