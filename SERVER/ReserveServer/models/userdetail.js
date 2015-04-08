var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt'))

var UserDetail = orm.Model.extend({
    tableName: 'UserDetail',


    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            nickname: 'required'
        }).run(this.attributes)
    },

    hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserDetail;