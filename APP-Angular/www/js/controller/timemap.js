angular.module('Aero.controllers')
    .controller('TimeMapCtrl', [
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
                    lat: 30.450,
                    lng: 114.26,
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
                  url: AeroConfig.backend + '/timemarkposts',
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
                      message: '<div ng-include src="\'templates/marker.html\'" onload="i = '+i+'"></div>'
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

!function (a) {
    function b(a, b, c, d) {
        this.west = Math.min(a, c), this.north = Math.max(b, d), this.east = Math.max(a, c), this.south = Math.min(b, d)
    }

    function c(a, b, c) {
        return a.west <= b && a.east >= b && a.north >= c && a.south <= c
    }

    function d(a, b) {
        for (var d = 0; d < k.length; d++)if (c(k[d], a, b)) {
            for (var e = 0; e < l.length; e++)if (c(l[e], a, b))return !1;
            return !0
        }
        return !1
    }

    function e(a, b) {
        var c = -100 + 2 * a + 3 * b + .2 * b * b + .1 * a * b + .2 * Math.sqrt(Math.abs(a));
        return c += 2 * (20 * Math.sin(6 * a * h) + 20 * Math.sin(2 * a * h)) / 3, c += 2 * (20 * Math.sin(b * h) + 40 * Math.sin(b / 3 * h)) / 3, c += 2 * (160 * Math.sin(b / 12 * h) + 320 * Math.sin(b * h / 30)) / 3
    }

    function f(a, b) {
        var c = 300 + a + 2 * b + .1 * a * a + .1 * a * b + .1 * Math.sqrt(Math.abs(a));
        return c += 2 * (20 * Math.sin(6 * a * h) + 20 * Math.sin(2 * a * h)) / 3, c += 2 * (20 * Math.sin(a * h) + 40 * Math.sin(a / 3 * h)) / 3, c += 2 * (150 * Math.sin(a / 12 * h) + 300 * Math.sin(a / 30 * h)) / 3
    }

    function g(a, b) {
        var c = {};
        if (!d(a, b))return c = {lat: b, lng: a};
        var g = e(a - 105, b - 35), k = f(a - 105, b - 35), l = b / 180 * h, m = Math.sin(l);
        m = 1 - j * m * m;
        var n = Math.sqrt(m);
        return g = 180 * g / (i * (1 - j) / (m * n) * h), k = 180 * k / (i / n * Math.cos(l) * h), c = {
            lat: b + g,
            lng: a + k
        }
    }

    var h = 3.141592653589793, i = 6378245, j = .006693421622965943, k = [new b(79.4462, 49.2204, 96.33, 42.8899), new b(109.6872, 54.1415, 135.0002, 39.3742), new b(73.1246, 42.8899, 124.143255, 29.5297), new b(82.9684, 29.5297, 97.0352, 26.7186), new b(97.0253, 29.5297, 124.367395, 20.414096), new b(107.975793, 20.414096, 111.744104, 17.871542)], l = [new b(119.921265, 25.398623, 122.497559, 21.785006), new b(101.8652, 22.284, 106.665, 20.0988), new b(106.4525, 21.5422, 108.051, 20.4878), new b(109.0323, 55.8175, 119.127, 50.3257), new b(127.4568, 55.8175, 137.0227, 49.5574), new b(131.2662, 44.8922, 137.0227, 42.5692)];
    a.transformFromWGSToGCJ = g
}(window);