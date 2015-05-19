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
            $scope.backend = AeroConfig.backend;

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/user/' + userId + '/detail',
                withCredentials: true
            }).success(function(data, status, headers, config) {
                console.log('debug', data);
                $scope.userdetail = data;
            }).error(function(data, status, headers, config) {
                console.log('error', data);
            });


            /**************************************************
             * @@Request Friend
             * @method: get
             **************************************************/
            $scope.request = function() {
                $http({
                    method: 'GET',
                    url: AeroConfig.backend + '/friend/request/' + $scope.userdetail.User_id,
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                  console.log('debug', data);
                }).error(function(data, status, headers, config) {
                  console.log('error', data);
                });
            };
        }
    ]);