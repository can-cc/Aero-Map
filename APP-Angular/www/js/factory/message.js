angular.module('Aero').factory('messages',['$rootScope','$localStorage', function($rootScope, $localStorage){
  var messages = {};

  messages.chats = {};

  messages.addChat = function(userID, message){
    messages.chats[userID] = messages.chats[userID] || [];
    messages.chats[userID].push(message);
    $localStorage.messages = messages;
    $rootScope.$broadcast('user:' + userID + ':updated' ,message);
  };

  messages.getChat = function(userID) {
    return messages.chats[userID];
  };



  return messages;
}]);