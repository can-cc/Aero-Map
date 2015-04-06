var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt'))

var User = orm.Model.extend({
    tabelName: 'Users',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            username: 'required',
            password: 'required',
            email: ['required', 'email']
        }).run(this.attributes)
    }
}, {
    loginByUsername: Promise.method(function(username, password) {
        if (!username || !password) throw new Error('Email and password are both required');
        return new this({
            email: username.toLowerCase().trim()
        }).fetch({
            require: true
        }).tap(function(customer) {
            return bcrypt.compareAsync(customer.get('password'), password);
        });
    }),

    loginByEmail: Promise.method(function(email, password) {
        if (!email || !password) throw new Error('Email and password are both required');
        return new this({
            email: email.toLowerCase().trim()
        }).fetch({
            require: true
        }).tap(function(customer) {
            return bcrypt.compareAsync(customer.get('password'), password);
        });
    })
})
