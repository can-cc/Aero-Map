angular.module('Aero.controllers')
  .controller('LoginCtrl', ['$scope', '$http',  'AeroConfig', function($scope, $http,  AeroConfig) {

        $scope.login = function() {
          $http.post(AeroConfig.backend + '/login', {
                    username: $scope.username,
                    password: $scope.password
                })
                .success(function(data, status, headers, config) {
                    if (data.error) {

                    }
                  //alert(JSON.stringify(data));
                  localStorage.setItem('username', data.username);
                  localStorage.setItem('email', data.email);
                  localStorage.setItem('id', data.id);
                  window.location.hash = '#map';
                }).
            error(function(data, status, headers, config) {
                alert(JSON.stringify(data));
            });
        };


    }]);