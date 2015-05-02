angular.module('Aero.controllers')
    .controller('DetailCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

            $scope.go = function() {
                var detaildata = {
                    nickname: $scope.nickname,
                    sex: $scope.sex,
                    city: $scope.city,
                    school: $scope.school,
                    interest: $scope.interest,
                    public_email: $scope.public_email,
                    photo_number: $scope.photo_number,
                    qq: $scope.qq,
                    self_description: $scope.self_description
                };
                console.log('debug', detaildata);
                $http({
                    method: 'POST',
                    url: AeroConfig.backend + '/user/detail',
                    data: detaildata,
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            };


        }
    ]);