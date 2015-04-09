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
            title: ['required', 'minLenght:5'],
          context: ['required', 'minLenght:20'],
          location: 'required',
          valid: 'empty',
          deadline: 'required' //default from route or control layer
        });
    },

    comments: function() {
        return this.hasMany(Comment);
    }

  hasTimestamps: ['created_at', 'updated_at']

});

module.exports = MarkPost;