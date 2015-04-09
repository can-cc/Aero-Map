var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    Comment = require('./markpost_comment');


var MarkPost = orm.Model.extend({
    tableName: 'MarkPost',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        returng checkit({
            title: 'minLenght:5'
        });
    },

    comments: function() {
        return this.hasMany(Comment);
    }

  hasTimestamps: ['created_at', 'updated_at']

});

module.exports = MarkPost;