var knex = require('../../db').knex

var createUsers = function() {
    knex.schema.createTable('Users', function(table) {
        table.increments().unique()
        table.string('username')
            .unique()
            .notNullable()
        table.string('password')
            .notNullable()
        table.string('email')
            .unique()
            .notNullable()
        table.timestamps()
    })
}

var createUsersDetail = function() {
    knex.schema.createTable('UsersInfomation', function(table) {
        table.increments().unique()
        table.integer('user_id')
            .unique()
            .unsigner()
            .notNullable()
            .referencesCoulumn('id')
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


var createUsersSetting = function() {

}

var createUsersInfomation = function() {

}


var recreate = function() {
    knex.schema.hasTable('Users').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('users', function(t) {
                t.increments('id').primary();
                t.string('first_name', 100);
                t.string('last_name', 100);
                t.text('bio');
            });
        }
    });
}
