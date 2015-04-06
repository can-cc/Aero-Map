var schema = require('../../database/schema')

describe('All schema test', function(){
    describe('#create all schema', function(){
        it('should return true', function(done){
            schema.create_all_tables(function(err, result){
                if(err || !result) throw new Error()
                done()
            })
        })
    })

    
    describe('#drop all schema', function(){
        it('should return true', function(done){
            schema.drop_all_tables(function(err, result){
                if(err || !result) throw new Error()
                done()
            })
        })
    })
    
    
    describe('#truncate all schema', function(){
        it('should return true', function(done){
            schema.truncate_all_tables(function(err, result){
                if(err || !result) throw new Error()
                done()
            })
        })
    })

   
})
