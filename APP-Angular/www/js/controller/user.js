angular.module('Aero.controllers')
    .controller('UserCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        'AeroConfig',
        function(
            $scope,
            $http,
            $stateParams,
            AeroConfig) {

            var userId = $stateParams.userId;

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/user/' + userId + '/detail',
            }).success(function(data, status, headers, config) {
              console.log( 'debug', data );

            }).error(function(data, status, headers, config) {
              console.log( 'debug', data );
            });


        }
    ]);