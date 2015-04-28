var orm = require('../db').orm;

var UserLimit = orm.Model.extend({
    tableName: 'UserLimit',

  idAttribute: 'User_id',

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserLimit;