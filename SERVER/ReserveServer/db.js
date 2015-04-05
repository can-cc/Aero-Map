var setting = require('./settting'),
knex = require('knex')({
    client: 'pg',
    connection: {
        host     : setting.db.pg.host,
        user     : setting.db.pg.username,
        password : setting.db.pg.passwd,
        database : setting.db.pg.database
    }
})

exports.knex = knex

var bookshelf = require('bookshelf')(knex)

//orm object
exports.orm = bookshelf
