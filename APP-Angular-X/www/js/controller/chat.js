angular.module('Aero.controllers')
    .controller('ChatCtrl', [
        '$scope',
        '$http',
        'chatsocket',
        'AeroConfig',
        'messages',
        '$stateParams',
        function(
            $scope,
            $http,
            chatsocket,
            AeroConfig,
            messages,
            $stateParams) {
            $scope.messages = [];

            $scope.userId = $stateParams.userId;
            $scope.backend = AeroConfig.backend;
            var tarUserId = $stateParams.userId;
            angular.forEach(messages.getChat(tarUserId), function(message) {
                $scope.messages.push(message);
            });
            $scope.send = function() {
                console.log('bbbbbbbbbbbbbi');
                var chatmessage = $scope.chatmessage;
                var tarUserId = $stateParams.userId;
                var message = {
                    tarUserId: tarUserId,
                    chatmessage: chatmessage,
                    time: new Date().toString()
                };
                chatsocket.emit('receiveMessage', message);
                messages.addChat(tarUserId, message);
            };

            $scope.$on('user:' + tarUserId + ':updated', function(event, data) {
                if (data.fromUserId == tarUserId) {
                    data.self = false;
                } else {
                    data.self = true;
                }
                // you could inspect the data to see if what you care about changed, or just update your own scope
                $scope.messages.push(data);
                console.log($scope.messages);
            });

        }
    ]);





