var assert = require('assert'),
    User = require('../../models/user'),
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
    })

    //************************************************************
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


})