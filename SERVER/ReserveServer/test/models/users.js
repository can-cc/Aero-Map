var assert = require('assert'),
    winston = require('winston'),
    user_model = require('../../models/users'),
    user_schema = require('../../database/schema/user')

describe('User Model Test', function(){
    //correct user data
    var userData1 = {
        username: 'test1',
        password: '123456678',
        email: 'hihi@hotmail.com'
    }

    //password toot short
    var userData2 = {
        username: 'test2',
        password: '1234',
        email: 'hih@hotmail.com'
    }

    //email format error
    var userData3 = {
        username: 'test2',
        password: '1234',
        email: 'hihAhotmail.com'
    }
    
    //have not password
    var userData4 = {
        username: 'test2',
        email: 'hih@hotmail.com'
    }
    
    //have empty
    var userData5 = {
        username: 'test2',
        password: '',
        email: 'hih@hotmail.com'
    }
    
    describe('#create user', function(){
        it('', function(done){
            
        })
    })
})



















