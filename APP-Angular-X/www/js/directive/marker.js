angular.module('Aero', [])
  .directive('marker', ['$http', '$compile', function($http, $compile){
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: '/templates/mark.html'
    };
  }]);