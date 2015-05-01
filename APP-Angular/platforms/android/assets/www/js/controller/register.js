angular.module('Aero.controllers')
  .controller('RegCtrl', ['$scope', '$http', function($scope, $http){
    $scope.ssd = 'sdsd';
    $scope.register = function(){
      $http.post('http://10.42.0.30:3000/signin', {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }).
        success(function(data, status, headers, config) {
          alert(data);
        }).
        error(function(data, status, headers, config) {
          alert(JSON.stringify(data));
        });
    };
  }]);