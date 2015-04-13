var assert = require('assert');
var MarkPostService = require('../../services/markpost');

describe('MARKPOST SERVICE TEST', function() {

    describe('#fetch area markposts by coordinate', function() {
        it('should return success promise', function(done) {
            var coordinate = {
                longitude: 0.01,
                latitude: 0.02
            };
            MarkPostService.getAreaMarkPointsRaw(coordinate, 1000).then(function(resp) {
                console.log('success', resp.rows);
                done();
            });
        });
    });

});