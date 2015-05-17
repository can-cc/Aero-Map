angular.module('Aero.controllers')
  .controller('UserMarkpostCtrl', [
    '$scope',
    '$http',
    'AeroConfig',
    '$stateParams', function(
      $scope,
      $http,
      AeroConfig,
      $stateParams){

      var userId = $stateParams.userId;
      $http({
        method: 'GET',
        url: AeroConfig.backend + '/api/user/' + userId + '/markposts',
        withCredentials: true
      }).success(function(data, status, headers, config){
        console.log('debug', data);
        $scope.markposts = data;
      }).error(function(data, status, headers, config){
        console.log('error', data);
      });
      

  }]);