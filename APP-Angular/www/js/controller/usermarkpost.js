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
      
      $scope.backend = AeroConfig.backend;
      var userId = $stateParams.userId;
      $http({
        method: 'GET',
        url: AeroConfig.backend + '/api/user/' + userId + '/markposts',
        withCredentials: true
      }).success(function(data, status, headers, config){
        console.log('debug', data);
        if(data.markposts.length === 0){
          $scope.isEmpty = true;
        }
        $scope.data = data;
      }).error(function(data, status, headers, config){
        console.log('error', data);
      });
      

  }]);