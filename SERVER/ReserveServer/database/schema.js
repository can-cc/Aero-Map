var winston = require('winston'),
    user_schema = require('./schema/user'),
    async = require('async')

exports.create_all_tables = function(callback) {
    async.series([
        function(call) {
            user_schema.create_all_tables(function(err, result) {
                if (err || !result) return call(new Error(), null)
                return call(null, true)
            })
        }
    ], function(err, results) {
        if (err || !results.every(function(result) {
                return result
            })) {
            winston.log('error', 'Create all tables Error!')
            return callback(new Error(), false)
        }
        return callback(null, true)

    })
}

exports.drop_all_tables = function(callback) {
    async.series([
        function(call) {
            user_schema.drop_all_tables(function(err, result) {
                if (err || !result) return call(new Error(), null)
                return call(null, true)
            })
        }
    ], function(err, results) {
        if (err || !results.every(function(result) {
                return result
            })) {
            winston.log('error', 'drop all tables Error!')
            return callback(new Error(), false)
        }
        return callback(null, true)
    })
}

exports.truncate_all_tables = function(callback) {
    async.series([
        function(call) {
            exports.drop_all_tables(function(err, result) {
                if (err || !result) {
                    winston.log('error', 'truncate: drop all table fail')
                    return call(new Error())
                }
                return call(null, true)
            })
        },
        function(call) {
            exports.create_all_tables(function(err, result) {
                if (err || !result) {
                    winston.log('error', 'truncate: create all table fail')
                    return call(new Error())
                }
                return call(null, true)
            })
        }
    ], function(err, results) {
        if (err || !results.every(function(result) {
                return result
            })) {
            winston.log('error', 'drop all tables Error!')
            return callback(new Error(), false)
        }
        return callback(null, true)
    })
}

function main() {
    if (process.argv.length != 3)
        return console.log('Usage: node schema < create(all) | truncate(all) | drop(all) >')
    switch (process.argv[3]) {
        case 'create':
            exports.create_all_tables(function(err, result) {
                if (err || !result) {
                    winston.log('error', 'Create all tables fail!')
                } else {
                    winston.log('info', 'Create all tables success!')
                }
            })
            break

        case 'truncate':
            exports.truncate_all_tables(function(err, result) {
                if (err || !result) {
                    winston.log('error', 'Truncate all tables fail!')
                } else {
                    winston.log('info', 'Truncate all tables success!')
                }
            })
            break

        case 'drop':
            exports.drop_all_tables(function(err, result) {
                if (err || !result) {
                    winston.log('error', 'Drop all tables fail!')
                } else {
                    winston.log('info', 'Drop all tables success!')
                }
            })
            break
    }
}
