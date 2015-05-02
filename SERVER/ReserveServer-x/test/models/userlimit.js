var assert = require('assert'),
    UserRouter = require('../../routes/user'),
    randomstring = require("randomstring"),
    request = require('supertest'),
    should = require('should'),
    UserLimit = require('../../models/userlimit.js');


describe('UserLimit Test', function() {
    describe.skip('create a limit', function() {
        it('should return success promise', function(done) {
          var testData = {
            User_id: 1,
            limitCode: 1
          };
          new UserLimit(testData).save(null, {method: 'insert'}).then(function(userlimit){
            console.log('debug', userlimit);
            done();
          });
        });
    });


  describe('update a limit', function() {
    it('should return success promise', function(done) {
      var testData = {
        User_id: 1,
        limitCode: 2
      };
      new UserLimit(testData).save(null).then(function(userlimit){
        console.log('debug', userlimit);
        done();
      });
    });
  });
});