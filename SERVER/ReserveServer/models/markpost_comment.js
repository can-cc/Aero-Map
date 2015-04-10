var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    User = require('./user');
    MarkPost = require('./markpost');

var MarkPost_Comment = orm.Model.extend({
    tableName: 'MarkPostComment',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            context: 'minLenght:10'
        });
    },

    user: function() {
      return this.belongTo(User);
    },

    markpost: function() {
      return this.belongTo(MarkPost);
    }

});

module.exports = MarkPost_Comment;