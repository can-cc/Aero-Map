angular.module('Aero.controllers')
    .controller('PostCtrl', [
        '$scope',
        '$http',
        'Upload',
        'AeroConfig',
        function(
            $scope,
            $http,
            Upload,
            AeroConfig) {

            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.$apply(function() {
                    $scope.position = position;
                });
            });


            $scope.imgHide = true;

            $scope.$watch('files', function() {
                $scope.upload($scope.files);
            });

            $scope.upload = function(files) {
                if (files && files.length) {
                    //only first i need
                    var file = files[0];
                    Upload.upload({
                        url: AeroConfig.backend + '/markpost/uploadimg',
                        file: file,
                        withCredentials: true
                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function(data, status, headers, config) {
                        $scope.backendSrc = data.src;
                        $scope.src = AeroConfig.backend + '/' + data.src;
                        $scope.imgHide = false;
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    });

                }
            };

            $scope.post = function() {
                var postData = {
                    title: $scope.title,
                    type: 1,
                    images: [$scope.backendSrc],
                    context: $scope.text,
                    days: $scope.days,
                    accuracy: $scope.position.coords.accuracy,
                    longitude: $scope.position.coords.longitude,
                    latitude: $scope.position.coords.latitude
                };
                $http({
                    method: 'POST',
                    url: AeroConfig.backend + '/markposts',
                    data: postData,
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                  //alert(JSON.stringify(data));
                  window.location.hash = '#map';
                }).error(function(data, status, headers, config) {
                    alert(JSON.stringify(data));
                });
            };

        }
    ]);