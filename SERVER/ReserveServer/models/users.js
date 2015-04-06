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
})
