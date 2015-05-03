angular.module('Aero.controllers')
    .controller('ProfileCtrl', [
        '$scope',
        '$http',
        'AeroConfig',
        function(
            $scope,
            $http,
            AeroConfig) {

            var userId = localStorage.getItem('id');
          console.log('debug', userId );

            $http({
                method: 'GET',
                url: AeroConfig.backend + '/user/' + userId + '/detail',
            }).success(function(data, status, headers, config) {
              console.log( 'debug', data );
              $scope.nickname = data.nickname;
              $scope.sex = data.sex;
              $scope.city = data.city;
              $scope.school = data.school;
              $scope.interest = data.interest;
              $scope.public_email = data.public_email;
              $scope.photo_number = data.photo_number;
              $scope.qq = data.qq;
              $scope.self_description = data.self_description;
              $scope.avatar =AeroConfig.backend + '/' + data.avatar;
            }).error(function(data, status, headers, config) {
              console.log( 'debug', data );
            });

          $scope.goChangeAvatar = function(){
            window.location.hash = '#avatar';
          };

          $scope.update = function(){
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
              method: 'PUT',
              url: AeroConfig.backend + '/user/' + userId + '/detail',
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