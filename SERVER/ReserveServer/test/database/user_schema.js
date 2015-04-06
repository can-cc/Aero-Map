var assert = require('assert'),
    async = require('async'),
    user_schema = require('../../database/schema/user')



describe('operation', function() {

    describe('#create User table', function() {
        it('should return promise and success', function(done) {
            user_schema.createUsers().then(
                function() {
                    done()
                },
                function(err) {
                    throw err
                }
            )
        })
    })

    describe('#create UsersDetail table', function() {
        it('should return promise and success', function(done) {
            user_schema.createUsersDetail().then(
                function() {
                    done()
                },
                function(err) {
                    throw err
                })
        })
    })
})

describe('all_operation', function() {
    describe('#drop_all_table', function() {
        it('shold return true', function(done) {
            user_schema.drop_all_tables(function(err, result) {
                if (err) throw err
                if (result) {
                    done()
                } else {
                    throw new Error()
                }
            })
        })
    })

    describe('#create_all_table', function() {
        it('should return true', function(done) {
            user_schema.create_all_tables(function(err, result) {
                if (err) throw err
                if (result) {
                    done()
                } else {
                    throw new Error()
                }
            })
        })
    })

    describe('#truncate_all_table', function() {
        it('should return true', function(done) {
            user_schema.truncate_all_tables(function(err, result) {
                if (err) throw err
                if (result) {
                    done()
                } else {
                    throw new Error()

                }
            })
        })
    })

    describe('#drop_all_table', function() {
        it('shold return true', function(done) {
            user_schema.drop_all_tables(function(err, result) {
                if (err) throw err
                if (result) {
                    done()
                } else {
                    throw new Error()
                }
            })
        })
    })
})
