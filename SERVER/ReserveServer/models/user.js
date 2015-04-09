var orm = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt')),
    UserDetail = require('./userdetail'),
    UserSetting = require('./usersetting'),
    UserInfomation = require('./userinfomation');

var User = orm.Model.extend({
    tableName: 'User',


    // set: function(){
    //   orm.Model.prototype.set.apply(this, arguments);
    // },

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

    detail: function() {
        return this.hasOne(UserDetail);
    },

    settting: function() {
        return this.hasOne(UserSetting);
    },

    infomation: function() {
        return this.hasOne(UserInfomation);
    },

    hasTimestamps: ['created_at', 'updated_at']
})

module.exports = User