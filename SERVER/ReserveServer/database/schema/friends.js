var knex = require('../../db').knex,
    async = require('async'),
    winston = require('winston');

var createFriends = exports.createFriends = function(){
  return knex.schema.createTable('Friends', function(table){
    table.increments().unique();
    table.integer('User_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('User');
    table.integer('Friend_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('User');


  });
};