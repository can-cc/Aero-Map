angular.module('Aero.controllers')
    .controller('MapCtrl', ['$scope', '$http', 'AeroConfig', function($scope, $http, AeroConfig) {
        // navigator.geolocation.getCurrentPosition(function(position){
        //   angular.extend($scope, {
        //     location: {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude,
        //       zoom: 4
        //     }
        //   });
        //   });
        angular.extend($scope, {
            center: {
              lat: 30.505,
              lng: 114.2549,
              zoom: 10
            },
          maxbounds: {},
          defaults: {
            maxZoom: 16,
            minZoom: 12,
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            tileLayerOptions: {
              opacity: 0.9,
              detectRetina: true,
              reuseTiles: true,
            },
            scrollWheelZoom: true
          }
        });



    }]);