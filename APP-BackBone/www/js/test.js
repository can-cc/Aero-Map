$('#test').click(function(event){
  console.log('f');
  $('.username-check')
    .removeClass('fi-pencil')
    .addClass('fi-check')
    .css('color', '#000000');
});