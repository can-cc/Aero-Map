var knex = require('../../db').knex,
    async = require('async'),
    winston = require('winston');

var createFriends = exports.createFriends = function() {
    return knex.schema.createTable('Friends', function(table) {
        table.increments().unique();
      table.unique(['User_id', 'Friend_id']);
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
        table.integer('friendliness')
            .defaultTo(1);
        table.boolean('isHidden')
            .defaultTo(false);
        table.timestamps();
    });
};

/************************************************
 * Should usally in Cache
 *************************************************/
var createUserFriendsInfo = exports.UserFriendsInfo = function() {
    return knex.schema.createTable('UserFriendsInfo', function(table) {
        table.increments();
        table.integer('User_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('User');
        table.integer('friendsNumber')
            .notNullable()
            .defaultTo(0);
        table.integer('followNumber')
            .notNullable()
            .defaultTo(0);
        table.integer('beFollowNumber')
            .notNullable()
            .defaultTo(0);
        table.timestamps();
    });
};


/******************************************
 *status type :int
 * 1: wait
 * 2: accept
 * 3: reject
 ******************************************/
var createFriendsRequest = exports.createFriendsRequest = function() {
    return knex.schema.createTable('FriendRequest', function(table) {
        table.increments();
        table.integer('RequestUser_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('User');
        table.integer('TarUser_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('User');
        table.enu('status', [1, 2, 3])
            .defaultTo(1);
        table.timestamps();
    });
};


/*********************************************
 * BATCH
 *********************************************/
exports.drop_all_tables = function(callback) {
    async.series([
            function(next) {
                knex.schema.dropTableIfExists('Friends').then(function(success) {
                    winston.info('drop Friends table success ', JSON.stringify(success));
                    next(null, true);
                }, function(error) {
                    winston.error('drop Friends table error', JSON.stringify(error));
                    next(new Error('drop Friends error error'), false);
                });
            },
            function(next) {
                knex.schema.dropTableIfExists('UserFriendsInfo').then(function(success) {
                    winston.info('drop UserFriendsInfo table success', JSON.stringify(success));
                    next(null, true);
                }, function(error) {
                    winston.error('drop UserFriendsInfo table error ', JSON.stringify(error));
                    next(new Error('drop UserFriendsInfo error'), false);
                });
            },
            function(next) {
                knex.schema.dropTableIfExists('FriendRequest').then(function(success) {
                    winston.info('drop UserFriendsInfo table success', JSON.stringify(success));
                    next(null, true);
                }, function(error) {
                    winston.error('drop UserFriendsInfo table error ', JSON.stringify(error));
                    next(new Error('drop UserFriendsInfo error'), false);
                });
            }
        ],
        function(err, result) {
            winston.info('error', err);
            if (err) {
                return callback(err);
            }
            winston.info(result);
            return callback(null, result.every(function(flag) {
                return flag;
            }));
        });
};

exports.create_all_tables = function(callback) {
    async.series([
        function(call) {
            createFriends().then(
                function(success) {
                    winston.log('info', 'create createFriends table success', success);
                    call(null, true);
                },
                function(error) {
                    winston.info('error', 'create createFriends table', JSON.stringify(error));
                    call(new Error('create  createFriends table error'), false);
                });
        },
        function(call) {
            createUserFriendsInfo().then(
                function(success) {
                    winston.log('info', 'create UserDetail table success', success);
                    call(null, true);
                },
                function(error) {
                    winston.log('error', 'create UserDetail table error', JSON.stringify(error));
                    call(new Error('create User table error'), false);
                });
        },
        function(call) {
            createFriendsRequest().then(
                function(success) {
                    winston.log('info', 'create FriendsRequest table success', success);
                    call(null, true);
                },
                function(error) {
                    winston.log('error', 'create FriendsRequest table error', JSON.stringify(error));
                    call(new Error('create FriendsRequest table error'), false);
                });
        }
    ], function(err, results) {
        winston.log('debug', err);
        winston.log('debug', results);
        if (err) return callback(err);
        return callback(null, results.every(function(flag) {
            return flag;
        }));
    });
};

exports.truncate_all_tables = function(callback) {
    async.series([
        function(call) {
            exports.drop_all_tables(function(err, result) {
                if (err) return call(err);
                if (result) {
                    return call(null, true);
                } else {
                    return call(new Error('Drop All Tables Error!'));
                }
            });
        },
        function(call) {
            exports.create_all_tables(function(err, result) {
                if (err) return call(err);
                if (result) {
                    return call(null, true);
                } else {
                    return call(new Error('Create All Tables Error!'));
                }
            });
        }
    ], function(err, results) {
        winston.log('debug', err);
        winston.log('debug', results);
        if (err) return callback(err);
        return callback(null, results.every(function(flag) {
            return flag;
        }));
    });
};