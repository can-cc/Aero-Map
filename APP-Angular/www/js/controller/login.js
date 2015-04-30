angular.module('Aero.controllers')
  .controller('LoginCtrl', ['$scope','$http', 'AeroConfig', function($scope, $http, AeroConfig){

    $scope.login = function(){
      $http.post(AeroConfig.backend + '/loginbypp', {

        username: $scope.username,
        password: $scope.password
      })
        .success(function(data, status, headers, config) {
          if(data.error){

          }
          alert(JSON.stringify(data));
        }).
        error(function(data, status, headers, config) {
          alert(JSON.stringify(data));
        });
    };

    $scope.test = function(){
      $http.get(AeroConfig.backend + '/user/test', {
        withCredentials: true,
      })
        .success(function(data, status, headers, config) {
          alert(JSON.stringify(data));
        }).
        error(function(data, status, headers, config) {
          alert(JSON.stringify(data));
        });
    };
  }]);