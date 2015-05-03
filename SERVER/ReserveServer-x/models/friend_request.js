var orm = require('../db').orm,
    Checkit = require('checkit'),
    logger = require('../logger'),
    Promise = require('bluebird'),
    Friends = require('./friends'),
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
        }).run(this.attributes)
    },

    hasTimestamps: ['created_at', 'updated_at']
});

module.exports = FriendRequest;