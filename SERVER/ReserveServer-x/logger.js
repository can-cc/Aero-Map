var winston = require('winston'),
    setting = require('./setting')

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
})
logger.level = setting.log_level

module.exports = logger










