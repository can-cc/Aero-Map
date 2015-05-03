var assert = require('assert'),
    UserRouter = require('../../routes/user'),
    randomstring = require("randomstring"),
    request = require('supertest'),
    should = require('should');


describe('User Router Test', function() {

    var domain = 'http://0.0.0.0:3000';

    var testData = {
        username: randomstring.generate(6),
        password: '123456acx',
        email: randomstring.generate(5) + '@hotmail.com'
    };

    describe('#user sign in', function() {
        it('should return user json', function(done) {


            console.log('debug', 'testData before send', testData);

            request(domain)
                .post('/signin')
                .send(testData)
                .end(function(err, res) {

                    console.log('debug', res.status);
                    assert.equal(res.status, 200);
                    done();
                });

        });
    });

    describe.skip('#user login by username', function() {
        it('should return user json', function(done) {
            var loginData = {
                username: testData.username,
                password: testData.password,
                type: 1
            };

            request(domain)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    console.log('debug', res.status);
                    console.log('debug', res.body);
                    assert.equal(res.status, 200);
                    done();
                });
        });
    });

    describe.skip('#user login by email', function() {
        it('should return user json', function(done) {
            var loginData = {
                username: testData.email,
                password: testData.password,
                type: 2
            };
            request(domain)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    console.log('debug', res.status);
                    console.log('debug', res.body);
                    assert.equal(res.status, 200);
                    done();
                });

        });
    });

  describe('user login by passport whatever username or email', function(){
    it('should return user json without password', function(done){
      var loginData = {
        username: testData.email,
        password: testData.password,
      };
      request(domain)
        .post('/loginbypp')
        .send(loginData)
        .end(function(err, res) {
          console.log('debug', res.status);
          console.log('debug', res.body);
          assert.equal(res.status, 200);
          done();
        });

    });
  });


});