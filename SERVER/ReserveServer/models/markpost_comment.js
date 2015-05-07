var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    User = require('./user'),
    MarkPost = require('./markpost');


/**************************************************
 *
 * id integer
 * "MarkPost_id"
 * "User_id"
 * context
 * created_at
 * updated_at
 **************************************************/


var MarkPost_Comment = orm.Model.extend({
    tableName: 'MarkPostComment',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            context: 'minLenght:5'
        });
    },

    user: function() {
      return this.belongsTo(User);
    },

    markpost: function() {
      return this.belongsTo(MarkPost);
    },

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = MarkPost_Comment;