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
      User_id: 'required',
      Friend_id: 'required',
    }).run(this.attributes)
  },

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = Friends;