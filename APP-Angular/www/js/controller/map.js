angular.module('Aero.controllers')
    .controller('MapCtrl', [
        '$scope',
        '$http',
        'leafletEvents',
        'leafletData',
        '$modal',
        'AeroConfig',
        function(
            $scope,
            $http,
            leafletEvents,
            leafletData,
            $modal,
            AeroConfig) {
            angular.extend($scope, {
                center: {
                    // lat: 30.505,
                    // lng: 114.2549,
                    zoom: 13,
                    autoDiscover: true
                },
                defaults: {
                    maxZoom: 16,
                    minZoom: 5,
                    tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    tileLayerOptions: {
                        opacity: 0.9,
                        detectRetina: true,
                        reuseTiles: true,
                    },
                    scrollWheelZoom: true
                },
                controls: {
                    custom: []
                },
              markers: {}
            });

          $scope.backend = AeroConfig.backend;

            /****************************************************
             * Get Geolocation!
             ****************************************************/
            var getMarks = function(longitude, latitude) {
                $http({
                  method: 'GET',
                  url: AeroConfig.backend + '/markposts',
                  params: {
                        longitude: longitude,
                        latitude: latitude
                    },
                  withCredentials: true
                })
                .success(function(data, status, headers, config) {
                  console.log('debug', data);
                  $scope.data = data;
                  $scope.test = 'fuck';
                  for(var i=0, max = data.length; i < max; i++){
                    $scope.markers[data[i].id] = {
                      lng: parseFloat(data[i].longitude),
                      lat: parseFloat(data[i].latitude),
                      compileMessage: true,
                      getMessageScope: function () { return $scope; },
                      message: '<div ng-include src="\'/templates/marker.html\'" onload="i = '+i+'"></div>'
                    };
                  }
                    })
                    .error(function(data, status, headers, config) {
                        alert(JSON.stringify(data));
                    });
            };

            $scope.$on('leafletDirectiveMap.moveend', function(event) {
                //alert(JSON.stringify($scope.center));
              console.log('log', JSON.stringify($scope.center));
                getMarks($scope.center.lng, $scope.center.lat);
            });


            /**************************************************
             *  Post Control
             **************************************************/

            var MyControl = L.Control.extend({
                options: {
                    position: 'topright'
                },

                onAdd: function(map) {
                    // create the control container with a particular class name
                    var container = L.DomUtil.create('div', 'post-trigger');

                    // ... initialize other DOM elements, add listeners, etc.
                    angular.element(container).append('<i class="fi-pencil"></i>');
                    L.DomEvent.addListener(container, 'click', function(e) {
                        window.location.hash = '#post';
                    });
                    return container;
                }
            });

            $scope.controls.custom.push(new MyControl());


        }
    ]);