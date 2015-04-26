var orm = require('../db').orm;

var UserLimit = orm.Model.extend({
    tableName: 'UserLimit',

    idAttribute: 'User_id'


});

module.exports = UserLimit;