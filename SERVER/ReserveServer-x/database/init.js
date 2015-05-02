var logger = require('../logger'),
    user_schema = require('./schema/user'),
    async = require('async')

function create_all_tables() {
    async.series([
        function(call){
            user_schema.create_all_tables(function(err, result){
                if(err || !result) return call(new Error())
                return call(null, true)
            })        
        }
    ], function(err, results){
        if(err || !results.every(function(result){
            return result 
        })) 
            logger.log('error', 'Create all tables fail!')
    })
    
}

function drop_all_tables(){
    async.series([
        function(call){
            user_schema.drop_all_tables(function(err, result){
                if(err || !result){
                    return call(new Error())
                }
                return call(null, true)
            })
        }
    ], function(err, results){
        if(err || !results.every(function(result){
            return result
        }))
            logger.log('error', 'Drop all tables fail!')
    })
}



















