var knex = require('../../db').knex,
    async = require('async');

// install postgis functions in knex.postgis;
var knex_postgis = require('knex-postgis')(knex);




// knex.raw('CREATE TABLE global_points (id SERIAL PRIMARY KEY, name VARCHAR(64), location GEOGRAPHY(POINT,4326));').then(function(resp) {
//     console.log(resp);
// });

exports.createMarkPost = function() {
    return knex.schema.createTable('MarkPost', function(table) {
        table.increments();
        table.integer('type');
        table.integer('User_id')
            .unique()
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('User');
        table.string('title')
            .notNullable();
        table.text('context')
            .notNullable();
        table.string('images');
        //long lat
        table.specificType('location', 'GEOGRAPHY(POINT,4326)')
            .index()
            .notNullable();
        table.decimal('accuracy');
        table.boolean('valid')
            .defaultTo(true);
        table.dateTime('deadline');
        table.timestamps();
    })
}

exports.createMarkPostComment = function(callback) {
    return knex.schema.createTable('MarkPostComment', function(table) {
        table.increments();
        table.integer('MarkPost_id')
            .unique()
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('MarkPost');
        table.integer('User_id')
            .unique()
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('User');
        table.text('context')
            .notNullable();
        table.timestamps();
    })
};

exports.drop_all_tables = function(callback) {
    async.series([
        function(call) {
            knex.schema.dropTableIfExists('MarkPostComment').then(function(success) {
                console.log('drop MarkPostComment table success ', JSON.stringify(success));
                call(null, true);
            }, function(error) {
                console.log('drop MarkPostComment table error', JSON.stringify(error));
                call(new Error('drop MarkPostComment error error'), false);
            });
        },
        function(call) {
            knex.schema.dropTableIfExists('MarkPost').then(function(success) {
                console.log('drop MarkPost table success ', JSON.stringify(success));
                call(null, true);
            }, function(error) {
                console.log('drop MarkPost table error', JSON.stringify(error));
                call(new Error('drop UserDetail error error'), false);
            });
        }
    ], function(err, results) {
        console.log('error', err);
        if (err) {
            return callback(err);
        }
        console.log(results);
        return callback(null, results.every(function(flag) {
            return flag;
        }));
    });
};

exports.create_all_tables = function(callback) {
    async.series([
        function(call) {
            exports.createMarkPost().then(
                function(success) {
                    console.log('info', 'create MarkPost table success', success);
                    call(null, true);
                },
                function(error) {
                    console.log('error', 'create MarkPost table fail', JSON.stringify(error));
                    call(new Error('create MarkPost table error'), false);
                });
        },
        function(call) {
            exports.createMarkPostComment().then(
                function(success) {
                    console.log('info', 'create MarkPostComment table success', success);
                    call(null, true);
                },
                function(error) {
                    console.log('error', 'create MarkPostComment table fail', JSON.stringify(error));
                    call(new Error('create MarkPostComment table error'), false);
                });
        }
    ], function(err, results) {
        console.log('error', err);
        if (err) {
            return callback(err);
        }
        console.log(results);
        return callback(null, results.every(function(flag) {
            return flag;
        }));
    });
};