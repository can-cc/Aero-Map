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
            $scope.backend = AeroConfig.backend;
          chatsocket.removeAllListeners();
          chatsocket.on('receiveMessage', function(data) {
                messages.addChat(data.fromUserId, data);
            });

            chatsocket.on('receiveChatHash', function(data) {
                console.log(data);
                angular.forEach(data, function(value, key) {
                  $http({
                    url: AeroConfig.backend + '/user/' + key + '/detail',
                    method: 'GET',
                    withCredentials: true
                  }).success(function(detaildata, status, headers, config){
                    var avatar = detaildata.avatar;
                    $scope.chatHash.push({
                      key: key,
                      value: value,
                      avatar: detaildata.avatar,
                      nickname: detaildata.nickname
                    });
                    console.log( $scope.chatHash);
                  }).error(function(data, status, headers, config){
                    console.log('error', data);
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