var assert = require('assert'),
    MarkPost_Schema = require('../../database/schema/markpost');

describe('MarkPost module Model Test', function() {
    describe('#drop all tables', function() {
        it('should return success promise',
            function(done) {
                MarkPost_Schema.drop_all_tables(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    assert.ok(result);
                    done();
                });
            });
    });

    describe('#create all tables', function(err, result) {
        it('should return sucess promise', function(done) {
            MarkPost_Schema.create_all_tables(function(err, result) {
                if (err) throw err;
                console.log(result);
                assert.ok(result);
                done();
            });
        });
    });

    describe('#drop all tables', function() {
        it('should return success promise',
            function(done) {
                MarkPost_Schema.drop_all_tables(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    assert.ok(result);
                    done();
                });
            });
    });

});