var pg = require('pg'),
    setting = require('./setting')

var conString = 'postgres://' +
        setting.db.pg.username + ':' + 
        setting.db.pg.passwd + '@' + 
        setting.db.pg.host + '/' + 
        setting.db.pg.database

var client = new pg.Client(conString)
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err)
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err)
    }
    console.log(result.rows[0].theTime)
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end()
  })
})
