var AeroMapSetting = {
    development: true,
    port: 3000,
    host: '0.0.0.0',
    log_level: 'debug',
    db: {
        production: {
            database: 'Aero-Map',
            host: 'localhost',
            port: 'default',
            username: 'AeroAdmin',
            passwd: 'aero123',
            charset: 'UTF-8'
        },
        development: {
            database: 'Aero-Map-Development',
            host: 'localhost',
            port: 'default',
            username: 'AeroAdmin',
            passwd: 'aero123',
            charset: 'UTF-8'
        }
    },
    Pagination: {
        friendLoad: 10
    },
  redis_session: {
    host: 0.0.0.0,
    port: 6379
  }
};

module.exports = AeroMapSetting;