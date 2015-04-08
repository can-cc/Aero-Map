var orm = require('../db').orm,checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt'))

var User = orm.Model.extend({
    tableName: 'Users',


  set: function(){
    orm.Model.prototype.set.apply(this, arguments);
  },

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
          username: 'required',
          password: ['required', 'minLength:6'],
          email: ['required', 'email']
        }).run(this.attributes)
    },

  hasTimestamps: ['createdAt', 'updatedAt']
})

module.exports = User