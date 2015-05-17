var assert = require('assert'),
    MarkPostRouter = require('../../routes/markpost'),
    UserRouter = require('../../routes/user'),
    request = require('supertest');

describe('APi Router Test', function(){
  describe('timeline', function(){
    it('should return timeline markpost', function(done){
      request('http://localhost:3000')
      .get('/api/markpost/timeline')
        .end(function(error, res){
          console.log(res.body);
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  describe('user markposts', function(){
    it('should return users markpost', function(done){
      request('http://localhost:3000')
        .get('/api/user/1/markposts')
        .end(function(error, res){
          console.log(res.body);
          assert.equal(res.status, 200);
          done();
        });
    });
  });

});