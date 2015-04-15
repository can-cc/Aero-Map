var assert = require('assert'),
    async = require('async'),
    Friends_Schema = require('../../database/schema/friends')

describe('Friedns module Model Test', function() {
    describe('#drop all tables', function() {
        it('should return success promise', function(done) {
            Friends_Schema.drop_all_tables(function(err, result) {
                if (err) throw err;
                console.log(result);
                assert.ok(result);
                done();
            });
        });
    });

    describe('#create all tables', function(err, result) {
        it('should return sucess promise', function(done) {
            Friends_Schema.create_all_tables(function(err, result) {
                if (err) throw err;
                console.log(result);
                assert.ok(result);
                done();
            });
        });
    });

    describe('#drop all tables', function() {
        it('should return success promise', function(done) {
            Friends_Schema.drop_all_tables(function(err, result) {
                if (err) throw err;
                console.log(result);
                assert.ok(result);
                done();
            });
        });
    });

});