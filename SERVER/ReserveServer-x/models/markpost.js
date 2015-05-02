var orm = require('../db').orm,
    Checkit = require('checkit'),
    logger = require('../logger'),
    Promise = require('bluebird'),
    Comment = require('./markpost_comment'),
    knex = require('../db').knex;

var st = require('knex-postgis')(knex);

var MarkPost = orm.Model.extend({
    tableName: 'MarkPost',

    // initialize: function() {
    //      // this.on('saving', this.validateSave);
    //   this.validate.bind(this);
    //   },

    // validate: function(){
    //   return new Checkit({
    //     title: ['required', 'minLenght:5'],
    //     context: ['required', 'minLenght:20'],
    //     location: 'required',
    //     valid: 'empty',
    //     deadline: 'required' //default from route or control layer
    //   });
    // },

    validate: new Checkit({
        title: ['required', 'minLength:5'],
        context: ['required', 'minLength:20'],
        longitude: 'required',
        latitude: 'required',
        location: 'empty',
        valid: 'empty',
        deadline: 'required' //default from route or control layer
    }),

    saveWithPoint: function(data) {
        var checkit = this.validate;
        var attributes = this.attributes;
        var tableName = this.tableName;
        return new Promise(function(resolve, reject) {
            console.log('look this', attributes);
            checkit.run(attributes).then(function(validated) {
                    logger.log('debug', 'validated', validated);
                    logger.log('debug', attributes);
                    logger.log('debug', data);
                    var pointstr = attributes['longitude'] + ' ' + attributes['latitude'];
                    attributes['location'] = st.geomFromText('Point(' + pointstr + ')', 4326);
                    var sql = knex.insert(attributes).into(tableName).toString();
                    logger.log('debug', sql);
                    knex.raw(sql).then(function(resp) {
                        logger.log('debug', 'saving', resp);

                        resolve(resp);
                    });
                },
                function(error) {
                    reject(error);
                });
        });
    },



    //note the query sql var location!!!!!!!!!!!!
    distancePoints: function(coordinate, distance) {
        var pointstr = coordinate.longitude + ' ' + coordinate.latitude;
        var distancekm = distance * 1000;
        return this.collection().query().where('ST_DWithin(location, ST_GeographyFromText(' +
                                               '"SRID =4326;POINT(' + pointstr + ')"), ' + distancekm + ')').fetch();
    },

    comments: function() {
        return this.hasMany(Comment);
    },



    hasTimestamps: ['created_at', 'updated_at']

});

module.exports = MarkPost;