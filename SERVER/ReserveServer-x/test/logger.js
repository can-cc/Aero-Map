var assert = require("assert"),
    logger = require('../logger')

describe('logger lever', function() {
    describe('#fatal', function() {
        it('I should be red', function(done){
            logger.emit('fatal', 'I should be red!')
            done()
        })
    })
})
