angular.module('Aero.controllers')
    .controller('SearchUserCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

            $scope.searchType = 1;
            $scope.search = function() {
                $http({
                    method: 'GET',
                    url: AeroConfig.backend + '/user/search',
                    params: {
                        searchType: parseInt($scope.searchType),
                        searchStr: $scope.searchStr
                    }
                }).success(function(data, status, headers, config) {
                  console.log( 'debug', data );

                }).error(function(data, status, headers, config) {
                  console.log( 'debug', data );
                });
            };

        }
    ]);