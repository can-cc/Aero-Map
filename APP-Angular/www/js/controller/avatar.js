angular.module('Aero.controllers')
  .controller('AvatarCtrl', [
    '$scope',
    '$http',
    'Upload',
    'AeroConfig', function(
      $scope,
      $http,
      Upload,
      AeroConfig){

      console.log('debug userid in localStorage', localStorage.getItem('id'));
      $http.get(AeroConfig.backend + '/user/' + localStorage.getItem('id') + '/avatar')
        .success(function(data, status, headers, config){
          console.log('debug', data);
          $scope.src = AeroConfig.backend + '/' + data.avatar;
        }).error(function(data, status, headers, config){
          console.log('error', data);
        });


      $scope.$watch('files', function() {
        $scope.upload($scope.files);
      });


            $scope.upload = function(files) {
                if (files && files.length) {
                    //only first i need
                    var file = files[0];
                    Upload.upload({
                        url: AeroConfig.backend + '/user/avatar',
                        file: file,
                        withCredentials: true
                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function(data, status, headers, config) {
                        $scope.src = AeroConfig.backend + '/' + data.avatar;
                        $scope.imgHide = false;
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    });

                }
            };

  }]);