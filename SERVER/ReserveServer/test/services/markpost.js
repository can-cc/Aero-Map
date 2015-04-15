var assert = require('assert');
var MarkPostService = require('../../services/markpost');

describe('MARKPOST SERVICE TEST', function() {


  /***********************************************************
   * Common query
   ***********************************************************/
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

  /***********************************************************
   * Query by Type
   ***********************************************************/
  describe('#fetch area markposts by coordinate', function() {
    it('should return success promise', function(done) {
      var coordinate = {
        longitude: 0.01,
        latitude: 0.02
      };
      MarkPostService.getAreaMarkPointsRawFilterByType(coordinate, 1000, 1).then(function(resp) {
        console.log('success', resp.rows);
        done();
      });
    });
  });

  /***********************************************************
   * Query by Friends
   ***********************************************************/


  /***********************************************************
   * Fix(edit) Markpost only support user fix context , title,  pic
   ***********************************************************/
describe('#Fix MarkPost', function(){
  if('should return success promise');
});


});