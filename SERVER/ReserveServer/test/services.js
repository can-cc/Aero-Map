var assert = require('assert'),
    UserService = require('../../services/user')


describe('User Services', function() {
  var userData1 = {
    username: randomstring.generate(5),
    password: 'sdsd1234567',
    email: randomstring.generate(9) + '@hotmail.com'
  };

  describe('#user sign in', function(){
    it('should return true, mean sign in success',function(done){
      UserService.signIn(userData1).then(function(user){
        console.log('debug', JSON.stringify(user));
        done();
      });
    });
  });

    describe('#user login', function() {
        it('login by username, should return true, mean login success', function(done) {
          UserService.loginByUserName(userData1.username, userData1.password, function(err, result){

          });
        });

      it('login by email, should return true, mean login success', function(done) {

      });

    });
});