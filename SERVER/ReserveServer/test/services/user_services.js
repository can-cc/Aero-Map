var assert = require('assert'),
    User = require('../../models/user'),
    UserService = require('../../services/user'),
    randomstring = require('randomstring');


describe('User Services', function() {
    var userData1 = {
        username: randomstring.generate(5),
        password: 'sdsd1234567',
        email: randomstring.generate(9) + '@hotmail.com'
    };

    describe('#user sign in', function() {
        it('should return true, mean sign in success', function(done) {
            UserService.signIn(userData1, function(err, user) {
                if (err) throw err;
                console.log('debug', JSON.stringify(user));
                done();
            });
        });
    });

    describe('#user login', function() {
        it('login by username, should return success promise, mean login success', function(done) {
            UserService.loginByUserName(userData1.username, userData1.password, function(err, user){
              console.log('debug', err);
              console.log('debug', user);
              assert.equal(err, null);
              done();
            });
        });

        it('login by email, should return success promise mean login success', function(done) {
            UserService.loginByEmail(userData1.email, userData1.password, function(err, user){
              console.log('debug', err);
              console.log('debug', user);
              assert.equal(err, null);
              done();
            });
        });

        it('login by username and wrong passwpord should return error promise', function(done) {
            UserService.loginByUserName(userData1.username, '12s3456sdsaw2', function(err, user){
              console.log('debug', err);
              console.log('debug', user);
              assert.equal(err, null);
              assert.equal(user, null);
              done();
            });
        });


        it('login by unexist email and wrong passwpord should return error promise', function(done) {
            UserService.loginByEmail('sdsadw@hotmail.com', '123456sdsaw2', function(err, user){
              console.log('debug', err);
              console.log('debug', user);
              assert.ok(err);
              done();
            });
        });



    });
});