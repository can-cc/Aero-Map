angular.module('Aero.controllers')
    .controller('MarkPostCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        '$stateParams',
        function(
            $scope,
            $http,
            AeroConfig,
            $stateParams) {

          $scope.backend = AeroConfig.backend;

            var markPostId = $stateParams.markPostId;
            $http({
                    method: 'GET',
                    url: AeroConfig.backend + '/markpost/' + markPostId,
                })
                .success(function(data, status, headers, config) {
                  $scope.markpost = data;
                    console.log('debug', data);
                }).error(function(data, status, headers, config) {
                    console.log('debug', data);
                });

        }
    ]);