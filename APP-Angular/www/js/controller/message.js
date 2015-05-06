angular.module('Aero.controllers')
  .controller('MessageCtrl', [
    '$scope',
    'chatsocket',
    '$localStorage',
    'messages',
    '$rootScope',
    'AeroConfig', function(
      $scope,
      chatsocket,
      $localStorage,
      messages,
      $rootScope,
      AeroConfig){

      chatsocket.on('receiveMessage', function(data){
        console.log('i heard bbbbbbb');
        console.log(data);
        messages.addChat(data.fromUserId, data);
        console.log('chat', messages.chats);
      });


      $scope.$watch(function(messages){
        return messages.chats;
      }, function(a,b ){
        console.log(b);
      });


      chatsocket.on('checkOnline', function(data){
        alert('not online');
      });

  }]);