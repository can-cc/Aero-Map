var db = require('../db'),
    logger = require('../logger')

var User = function(user) {
    this.id = user.id,
    this.username = user.username,
    this.passwd = user.passwd,
    this.email = user.email
}

User.prototype.save = function(user) {
    
}
