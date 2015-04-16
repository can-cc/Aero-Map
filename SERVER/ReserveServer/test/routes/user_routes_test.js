var assert = require('assert'),
    UserRouter = require('../../routes/user'),
    randomstring = require("randomstring"),
    request = require('supertest');

describe('User Router Test', function(){

  describe('#user sign in', function(){
    it('should return user json', function(done){
      var testData = {
        username: randomstring.generate(6),
        password: '123456acx',
        email: randomstring.generate(5) + '@hotmail.com'
      };



    });
  });

});