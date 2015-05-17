angular.module('Aero.controllers')
    .controller('MessageCtrl', [
        '$scope',
        'chatsocket',
        '$localStorage',
        '$http',
        'messages',
        '$rootScope',
        'AeroConfig',
        function(
            $scope,
            chatsocket,
            $localStorage,
            $http,
            messages,
            $rootScope,
            AeroConfig) {

            $scope.chatHash = [];
          chatsocket.removeAllListeners();
            chatsocket.on('receiveMessage', function(data) {
                messages.addChat(data.fromUserId, data);
            });

            chatsocket.on('receiveChatHash', function(data) {
                console.log(data);
                angular.forEach(data, function(value, key) {
                    $scope.chatHash.push({
                      key: key,
                      value: value
                    });
                });
            });

            $scope.$watch(function(messages) {
                return messages.chats;
            }, function(a, b) {
                console.log(b);
            });

            chatsocket.on('checkOnline', function(data) {
                alert('not online');
            });

            chatsocket.emit('receiveChatHash', {});

        }
    ]);