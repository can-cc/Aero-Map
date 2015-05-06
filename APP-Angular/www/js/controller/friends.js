angular.module('Aero.controllers')
    .controller('FriendsCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

            var id = localStorage.getItem('id');

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/user/' + id + '/friends/' + 1,
                withCredentials: true,
            }).success(function(data, status, headers, config) {
              console.log('debug', data);
            }).error(function(data, status, headers, config) {
              console.log('debug', data);
            });

        }
    ]);