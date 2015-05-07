var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt')),
    UserDetail = require('./userdetail'),
    User = require('./user'),
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
    }).run(this.attributes);
  },

  user: function(){
    return this.belongsTo(User);
  },

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = Friends;