var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt')),
    UserDetail = require('./userdetail'),
    UserSetting = require('./usersetting'),
    UserInfomation = require('./userinfomation');

var Friends = orm.Model.extend({
  tableName: 'Friends',

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

});