var assert = require('assert'),
    MarkPostRouter = require('../../routes/markpost'),
    request = require('supertest');

describe('Mark Post Route Test', function() {

    /**************************************************
     * insert data
     **************************************************/
    var data1 = {
        type: 1,
        User_id: 1,
        title: 'hi!',
        context: 'I have a hotel table, and an amenity table. The only way they are "related" is via location, using PostGIS for PostgreSQL. In SQL I use a query like this to find the 5 nearest amenities to a hotel',
        deadline: today.addDays(3).toJSON(),
        longitude: 0.1234567,
        latitude: 0.1234567,
        //location: 'ST_GeographyFromText("SRID=4326;POINT(0 49)")',
        images: [],
        accuracy: 10.0,
    };

  describe('user post user');


});