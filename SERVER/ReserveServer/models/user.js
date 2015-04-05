var orm = require('../db').orm

var User = orm.Model.extend({
    tabelName: 'User'
})
