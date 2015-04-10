var assert = require('assert'),
    User = require('../../models/user'),
    UserDetail = require('../../models/userdetail');
user_schema = require('../../database/schema/user'),
    randomstring = require("randomstring")

describe('User Model Test', function() {
    //correct user data
    var userData1 = {
        username: randomstring.generate(5),
        password: '123456678',
        email: randomstring.generate(5) + '@hotmail.com',
        // created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    //password toot short
    var userData2 = {
        username: randomstring.generate(5),
        password: '1234',
        email: randomstring.generate(5) + '@hotmail.com',
        // created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    //email format error
    var userData3 = {
        username: randomstring.generate(5),
        password: '1234251515465',
        email: 'hihAhotmail.com',
        // created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    //have not password
    var userData4 = {
        username: randomstring.generate(5),
        email: randomstring.generate(5) + '@hotmail.com',
        //   created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    //have empty
    var userData5 = {
        username: randomstring.generate(5),
        password: '',
        email: randomstring.generate(5) + '@hotmail.com',
        // created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    var userData6 = {
        username: randomstring.generate(5),
        password: '123456678',
        email: randomstring.generate(5) + '@hotmail.com',
        // created_at: new Date().toJSON(),
        // updated_at: new Date().toJSON()
    }

    //********************************************************
    //create
    describe('#create user', function() {
        it('should return true', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData1).then(function(user) {
                console.log('debug', JSON.stringify(user));
                console.log('debug', JSON.stringify(userData1));
                done();
            });
        })

        it('should return false', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData2).then(function() {}, function(user) {
                console.log('debug', JSON.stringify(user));
                done();
            });
        });

        it('should return false', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData3).then(function() {}, function(err) {
                console.log('debug', JSON.stringify(err));
                done();
            });
        });

        it('should return false', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData4).then(function() {}, function(err) {
                console.log('debug', JSON.stringify(user));
                done();
            });
        });

        it('should return false', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData5).then(function() {}, function(err) {
                console.log('debug', JSON.stringify(err));
                done();
            });
        });

        //additional use to check second user detail
        it('should return true', function(done) {
            var user = new User();
            console.log('debug', JSON.stringify(user));
            user.save(userData6).then(function(user) {
                console.log('debug', JSON.stringify(user));
                console.log('debug', JSON.stringify(userData1));
                done();
            });
        })
    })

    //************************************************************
    //fetch
    describe('#fetch user', function() {
        it('should success', function(done) {
            new User({
                username: userData1.username
            }).fetch().then(function(user) {
                console.log('debug', JSON.stringify(user));
                done();
            });
            // User.collection().fetch().then(function(users){
            //   console.log(users);
            // });
        });
    })

    //************************************************************
    //update

    describe('#update user', function() {
        it('should success', function(done) {
            var user = new User({
                username: userData1.username
            }).fetch().then(function(fetched_user) {
                fetched_user.save({
                    email: randomstring.generate(5) + '@qq.com'
                }).then(function(updated_user) {
                    console.log('debug', JSON.stringify(updated_user));
                    done();
                });
            })
        });
    });



    /****************************************************************
     * User detail
     ****************************************************************/

    var userDetailData1 = {
        nickname: randomstring.generate(5),
        sex: 'male',
        self_description: 'I m good man!!!!!!!!!!!!!!!!!!',
        city: 12,
        school: 224,
        interest: 'baseball',
        public_email: randomstring.generate(8) + '@hotmail.com',
        photo_number: '1302618435',
        qq: '32513251'
    };

    var userDetailData2 = {
        nickname: randomstring.generate(5),
        sex: 'male'
    };

    var userDetailData3 = {
        nickname: randomstring.generate(5),
        sex: 'male'
    };


    describe('create user detail', function() {
        it('create userdetail use a exist user, should return success promise', function(done) {
            new User({
                username: userData1.username
            }).fetch().then(function(user) {
                var userId = user.get('id');
                new UserDetail(userDetailData1).save({
                    User_id: userId
                }).then(function(userDetail) {
                    console.log('debug', userDetail);
                    assert.ok(userDetail);
                    done();
                });
            });
        });

        it('create userdetail use a exist user, should return error promise(check duplicate)', function(done) {
            new User({
                username: userData1.username
            }).fetch().then(function(user) {
                var userId = user.get('id');
                new UserDetail(userDetailData1).save({
                    User_id: userId
                }).then(function(userDetail) {
                    console.log('debug', userDetail);
                }, function(error) {
                    console.log('debug', error);
                    done();
                });
            });
        });

        it('create userdetail use a exist user, should return success promise(check allow null)', function(done) {
            new User({
                username: userData6.username
            }).fetch().then(function(user) {
                var userId = user.get('id');
                new UserDetail(userDetailData2).save({
                    User_id: userId
                }).then(function(userDetail) {
                    console.log('debug', userDetail);
                    done();
                }, function(error) {
                    console.log('debug', error);
                });
            });
        });

        it('create userdetail use a not exist user, should return error promise', function(done) {
            new UserDetail(userDetailData3).save({
                User_id: 9987
            }).then(function(userDetail) {
                console.log('debug', userDetail);
                assert.ok(userDetail);
            }, function(error) {
                console.log('debug', error);
                done();
            });
        });
    });

    /***********************************************************
     *Relation
     ************************************************************/
    describe('#has one UserDetail', function() {
        it('should return success promise', function(done) {
            new User({
                username: userData1.username
            }).related('detail').fetch().then(function(userDetail) {
                console.log('debug', userDetail);
                done();
            });
        });
    });


})