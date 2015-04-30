angular.module('Aero.controllers')
  .controller('RegCtrl', ['$scope', '$http', 'AeroConfig', function($scope, $http, AeroConfig){

    $scope.register = function(){
      $http.post('http://10.42.0.30:3000/signin', {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      })
        .success(function(data, status, headers, config) {
          if(data.error){

          }
          localStorage.setItem('username', data.username);
          localStorage.setItem('email', data.email);
          localStorage.setItem('id', data.id);
          window.location.hash = "#login";
        }).
        error(function(data, status, headers, config) {
          alert(JSON.stringify(data));
        });
    };
  }]);