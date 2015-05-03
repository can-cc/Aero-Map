var orm = require('../db').orm;


/**************************************************
 * @@Model UserSetting
 *
 * "User_id"
 * "defaultMapView"  @default 1: normal
 * "defaultMapZoom" @default  13
 * "seePaperPlane" @default true
 * "receiveFriendRequest" @default true
 * created_at
 * updated_at
 *
 **************************************************/

var UserSetting = orm.Model.extend({
  tableName: 'UserSetting',

  idAttribute: 'User_id',

  hasTimestamps: ['created_at', 'updated_at']
});

module.exports = UserSetting;