angular.module('Aero.controllers')
  .controller('ChangePasswordCtrl', ['$scope','$http', 'AeroConfig', function($scope, $http, AeroConfig){

    $scope.change = function(){
      $http({
        method: 'POST',
        url: AeroConfig.backend + '/user/changepassword',
        data: {
          oldPassword: $scope.oldPassword,
          newPassword: $scope.newPassword
        },
        withCredentials: true
      }).success(function(data, status, headers, config){
        console.log(data);
        window.location.hash = '#login';
      }).error(function(data, status, headers, config){
        console.log(data);
      });
    };

  }]);