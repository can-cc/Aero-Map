angular.module('Aero.controllers')
    .controller('FriendsCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

          $scope.backend = AeroConfig.backend;
            var id = localStorage.getItem('id');

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/user/' + id + '/friends/' + 1,
                withCredentials: true,
            }).success(function(data, status, headers, config) {
              $scope.friends = data;
              console.log('debug', data);
            }).error(function(data, status, headers, config) {
              console.log('debug', data);
            });

          $scope.delete = function(friendId){
            $http({
              method: 'POST',
              url: AeroConfig.backend + '/user/' + id + '/friend/' +friendId + '/delete',
              data: {
                friendId: friendId
              },
              withCredentials: true
            }).success(function(data, status, headers, config){
              console.log(data);
            }).error(function(data, status, headers, config){
              console.log(data);
            });
          };

        }
    ]);