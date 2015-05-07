var io = require('socket.io')();
var redis = require('redis');
var ioredis = require('socket.io-redis');
var setting = require('../setting');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

io.adapter(ioredis({ host: 'localhost', port: 6379 }));

var redisdb = redis.createClient(setting.redis_session);

var sessionStore = new RedisStore(setting.redis_session);

io.set('authorization', function(handshakeData, callback) {
  if (!handshakeData.headers.cookie)
    return callback('No cookie transmitted.', false);
  var cookies = handshakeData.headers.cookie.split('; ');
  var sessionid;
  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].indexOf('sessionid22') != -1) {
      sessionid = cookies[i].split('=')[1];
      break;
    }
  }
  var sid = encodeURI(sessionid).slice(6, sessionid.indexOf('.') + 2);
  sessionStore.get(sid, function(err, session) {
    if (err) callback('Get session error.', false);
    handshakeData.session = session;
    return callback(null, true);
  });
});


io.on('connection', function (socket) {
  console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
  var user = socket.request.session.user;
  console.log(user);
  redisdb.hset(['SocketUserId:' + user.id, 'socketId', socket.id], redis.print);
  console.log(socket.id);

  socket.on('checkOnline', function(data){
    console.log( data );

    redisdb.hget(['SocketUserId:' + data.userId, 'socketId'], function(error, socketId){
      console.log('haha');
      if(!socketId){
        socket.emit('checkOnline', {
          userId: data.userId,
          online: false
        });
      }
      console.log('checkonline', socketId);
    });
  });

  socket.emit('fuck', {ss: 'let you bb'});

  socket.emit('news', { hello: user });
  socket.on('news', function (data) {
    onsole.log(data);
  });


  socket.on('receiveMessage', function(data){
    console.log('BIBIBIBIBIBIBIBI');
    var tarUserId = data.tarUserId,
        userId = user.id,
        chatmessage = data.chatmessage,
        time = data.time;
    console.log(data);
    redisdb.hget(['SocketUserId:' + tarUserId, 'socketId'], function(error, socketId){
      if(!socketId){
        console.log(socketId);
        socket.emit('checkOnline', {
          online: false
        });
      } else {
        io.sockets.connected[socketId].emit('receiveMessage', {
          fromUserId: userId,
          chatmessage: chatmessage,
          time: time
        });
      }
    });

  });

});

module.exports = io;