angular.module('Aero.controllers')
    .controller('CommentCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        'AeroConfig',
        function(
            $scope,
            $http,
            $stateParams,
            AeroConfig) {
          $scope.backend = AeroConfig.backend;
            var markpostId = $stateParams.markpostId;

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/markpost/' + markpostId + '/comments',
                withCredentials: true
            }).success(function(data, status, headers, config) {
              console.log('comment', data);
              $scope.comments = data;
            }).error(function(data, status, headers, config) {
              console.log('comment', data);
            });

            $scope.comment = function() {
                var context = $scope.comment_text;
                $http({
                    method: 'POST',
                    url: AeroConfig.backend + '/markpost/' + markpostId + '/comments',
                    data: {
                        markpostId: markpostId,
                        context: context
                    },
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                    console.log('comment', data);
                }).error(function(data, status, headers, config) {
                    console.log('comment', data);
                });

            };

        }
    ]);