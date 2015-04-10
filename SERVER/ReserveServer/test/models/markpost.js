var assert = require('assert'),
    MarkPost = require('../../models/markpost'),
    Comment = require('../../models/markpost_comment'),
    knex = require('../../db').knex;

var st = require('knex-postgis')(knex);

require('../../utils/addDate');

describe('Mark Post Module Model Test', function() {

    var today = new Date();

    var markPostData1 = {
        type: 1,
        User_id: 1,
        title: 'h',
        context: 'I have a hotel table, and an amenity table. The only way they are "related" is via location, using PostGIS for PostgreSQL. In SQL I use a query like this to find the 5 nearest amenities to a hotel',
        deadline: today.addDays(3).toJSON(),
        location: 'ST_GeographyFromText("SRID=4326;POINT(0 49)")',
        images: ['/img/1.jpg', '/img/2.jpg'],
        accuracy: 10.0,
    };

    describe('#user knex postgis insert generate', function() {
        it('should return success promise', function(done) {
            var sql1 = knex.insert({
                type: 1,
                User_id: 1,
                title: 'h',
                context: 'I have a hotel table, and an amenity table. The only way they are "related" is via location, using PostGIS for PostgreSQL. In SQL I use a query like this to find the 5 nearest amenities to a hotel',
                deadline: today.addDays(3).toJSON(),
                location: st.geomFromText('Point(0 0)', 4326),
                images: ['/img/1.jpg', '/img/2.jpg'],
                accuracy: 10.0,
            }).into('MarkPost').toString();
          console.log(sql1);
          done();
        });
    });

    describe('#create markpost models', function() {
        it('should return success promise', function(done) {
          new MarkPost(markPostData1).save(markPostData1)
            // .then(function(markpost) {
            //     console.log('debug', markpost);
            //     assert.ok(markpost);
            //     done();
          // });
        });

        it('should return error promise(error data)', function(done) {
            done();
        });


    });

});