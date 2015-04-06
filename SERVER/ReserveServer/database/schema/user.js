var knex = require('../../db').knex,
    async = require('async'),
    winston = require('winston')

exports.createUsers = function() {
    return knex.schema.createTable('Users', function(table) {
        table.increments().unique()
        table.string('username')
            .unique()
            .notNullable()
            .index()
        table.string('password')
            .notNullable()
        table.string('email')
            .unique()
            .notNullable()
        table.timestamps()
    })
}

/*
 * !!Because of dependence relation, truncate is diffcult to execute test
 */

// exports.truncateUsers = function(callback) {
//       async.series([
//           function(call){
//               knex.schema.dropTableIfExists('Users').then(function(success) {
//                 winston.info('drop Users table success', JSON.stringify(success))
//                 call(null, true)
//             }, function(error) {
//                 winston.error('drop Users table fail', JSON.stringify(error))
//                 call(new Error(), false)
//             })
//         },
//           function(call){
//               exports.createUsers().then(
//                 function(success) {
//                     winston.log('info', 'create Users table success', success)
//                     call(null, true)
//                 },
//                 function(error) {
//                     winston.info('error', 'create Users table', JSON.stringify(error))
//                     call(new Error('create Users table error'), false)
//                 })
//         }
//       ], function(err, results){
//         winston.log('debug', err)
//         winston.log('debug', results)
//         if (err) return callback(err)
//         return callback(null, results.every(function(flag) {
//             return flag
//         }))
//     })
// }

exports.createUsersDetail = function() {
    return knex.schema.createTable('UsersDetail', function(table) {
        table.increments().unique()
        table.integer('user_id')
            .unique()
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('Users')
        table.string('nickname')
            .unique()
            .notNullable()
        table.enu('sex', ['male', 'female', 'secert'])
            .notNullable()
        table.text('self_description')
        table.integer('city')
        table.integer('school')
        table.integer('interest')
        table.string('public_mail')
        table.string('phono_number')
        table.string('qq')
    })
}


exports.createUsersSetting = function() {
    
}

exports.createUsersInfomation = function() {
  
}

exports.drop_all_tables = function(callback) {
    async.series([

        function(next) {
            knex.schema.dropTableIfExists('UsersDetail').then(function(success) {
                winston.info('create UsersDetail table', JSON.stringify(success))
                next(null, true)
            }, function(error) {
                winston.error('drop UsersDetail table', JSON.stringify(error))
                next(new Error('drop UserDetail error'), false)
            })
        },
        function(next) {
            knex.schema.dropTableIfExists('Users').then(function(success) {
                winston.info('drop Users table', JSON.stringify(success))
                next(null, true)
            }, function(error) {
                winston.error('drop Users table', JSON.stringify(error))
                next(new Error(), false)
            })
        }

    ], function(err, result) {
        winston.info('error', err)
        if (err) {
            return callback(err)
        }
        winston.info(result)
        return callback(null, result.every(function(flag) {
            return flag
        }))
    })
}

exports.create_all_tables = function(callback) {
    async.series([
        function(call) {
            exports.createUsers().then(
                function(success) {
                    winston.log('info', 'create Users table success', success)
                    call(null, true)
                },
                function(error) {
                    winston.info('error', 'create Users table', JSON.stringify(error))
                    call(new Error('create Users table error'), false)
                })
        },
        function(call) {
            exports.createUsersDetail().then(
                function(success) {
                    winston.log('info', 'create UsersDetail table success', success)
                    call(null, true)
                },
                function(error) {
                    winston.log('error', 'create UsersDetail table error', JSON.stringify(error))
                    call(new Error('create Users table error'), false)
                })
        }
    ], function(err, results) {
        winston.log('debug', err)
        winston.log('debug', results)
        if (err) return callback(err)
        return callback(null, results.every(function(flag) {
            return flag
        }))
    })
}

exports.truncate_all_tables = function(callback) {
    async.series([
        function(call){
            exports.drop_all_tables(function(err, result){
                if(err) return call(err)
                if(result){
                    return call(null, true)
                } else {
                    return call(new Error('Drop All Tables Error!'))
                }
            })
        },
        function(call){
            exports.create_all_tables(function(err, result){
                if(err) return call(err)
                if(result){
                    return call(null, true)
                } else {
                    return call(new Error('Create All Tables Error!'))
                }
            })
        }
    ], function(err, results){
        winston.log('debug', err)
        winston.log('debug', results)
        if (err) return callback(err)
        return callback(null, results.every(function(flag) {
            return flag
        }))
    })
}


