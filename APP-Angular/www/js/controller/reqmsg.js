angular.module('Aero.controllers')
    .controller('ReqMsgCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

            $scope.backend = AeroConfig.backend;

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/friend/reqmsg',
                withCredentials: true
            }).success(function(data, status, headers, config) {
                console.log('debug', data);
                $scope.requests = data;
            }).error(function(data, status, headers, config) {
                console.log('debug', data);
            });

            $scope.accept = function(requestId) {
                $http({
                    method: 'POST',
                  url: AeroConfig.backend + '/friend/accept',
                  data:{
                    requestId: requestId
                  },
                  withCredentials: true,
                }).success(function(data, status, headers, config){
                  console.log('debug', data);
                }).error(function(data, status, headers, config){
                  console.log('debug', data);
                }
);
            };


        }
    ]);