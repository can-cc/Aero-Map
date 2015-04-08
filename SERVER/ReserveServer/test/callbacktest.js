

var test1 = function(callback){
  callback();
  console.log('Im test1');
};
var test2 = function(callback){
  return callback();
  console.log('Im test2');
};

test1(function(){
  console.log('I called test1');
});

test2(function(){
  console.log('I called test2');
});