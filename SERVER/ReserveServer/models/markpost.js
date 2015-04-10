var orm = require('../db').orm,
    checkit = require('checkit'),
    logger = require('../logger'),
    Promise = require('bluebird'),
    Comment = require('./markpost_comment'),
    knex = require('../db').knex;

var st = require('knex-postgis')(knex);

var MarkPost = orm.Model.extend({
    tableName: 'MarkPost',

    // initialize: function() {
    //     this.on('saving', this.validateSave);
    // },

    save: function(data) {
        return new Promise(function(resolve, reject) {
            this.validate.run(this.attributes).then(function(validated) {
                    loggger.log('debug', 'validated', validated);
                    logger.log('debug', this.attributes);
                    logger.log('debug', data);
                    var pointstr = this.attributes['location'];
                    this.attributes['location'] = st.geomFromText('Point(' + pointstr + ')', 4326);
                    var sql = knex.insert(this.attributes).into(this.tableName).toString();
                    logger.log('debug', sql);
                    knex.raw(sql).then(function(resp) {
                        logger.log('debug', 'saving', resp);
                    });
                },
                function(error) {
                    reject(error);
                });
        });
    },

    validate: new Checkit({
        title: ['required', 'minLenght:5'],
        context: ['required', 'minLenght:20'],
        location: 'required',
        valid: 'empty',
        deadline: 'required' //default from route or control layer
    }),

    comments: function() {
        return this.hasMany(Comment);
    },

    hasTimestamps: ['created_at', 'updated_at']

});

module.exports = MarkPost;