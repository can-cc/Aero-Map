angular.module('Aero.controllers')
  .controller('FriendsCtrl', [
    '$scope',
    '$http',
    'AeroConfig', function(
      $scope,
      $http,
      AeroConfig){

      $http({
        method: 'GET',
        url: AeroConfig.backend,
      });

  }]);