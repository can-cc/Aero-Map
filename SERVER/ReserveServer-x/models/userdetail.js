var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    User = require('./user');
bcrypt = Promise.promisifyAll(require('bcrypt'));

var UserDetail = orm.Model.extend({
    tableName: 'UserDetail',

  idAttribute: 'User_id',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            nickname: 'required',
            public_email: 'email',
            self_description: 'minLength:10'
        }).run(this.attributes);
    },

    user: function() {
        return this.belongTo(User);
    },

    hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserDetail;