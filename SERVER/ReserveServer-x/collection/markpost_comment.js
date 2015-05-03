var orm = require('../db').orm,
    Checkit = require('checkit'),
    logger = require('../logger'),
    Promise = require('bluebird'),
    Comment = require('./markpost_comment'),
    knex = require('../db').knex;

var Comment = orm.Collection.extend({
  model: Comment,


});
