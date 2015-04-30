angular.module('Aero.controllers')
    .controller('MapCtrl', [
        '$scope',
        '$http',
        'leafletEvents',
        'leafletData',
        'AeroConfig',
        function(
            $scope,
            $http,
            leafletEvents,
            leafletData,
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
                }


            });


            $scope.$on('leafletDirectiveMap.moveend', function(event) {
                //alert(JSON.stringify($scope.center));
            });


            /**************************************************
             *  Post Control
             **************************************************/

            // leafletData.getMap().then(function(map) {
            //   var MyControl = L.Control.extend({
            //     options: {
            //       position: 'topright'
            //     },

            //     onAdd: function (map) {
            //       // create the control container with a particular class name
            //       var container = L.DomUtil.create('div', 'my-custom-control');

            //       // ... initialize other DOM elements, add listeners, etc.

            //       return container;
            //     }
            //   });
            //   map.addControl(
            //     new MyControl()
            //   );
            // });
            //$scope.controls.custom.push(postControl);

            var MyControl = L.Control.extend({
                options: {
                    position: 'topright'
                },

                onAdd: function(map) {
                    // create the control container with a particular class name
                    var container = L.DomUtil.create('div', 'post-trigger');

                    // ... initialize other DOM elements, add listeners, etc.
                  angular.element(container).append('<i class="fi-pencil"></i>' );
                    L.DomEvent.addListener(container, 'click', function(e) {
                      openPostModal();
                    });
                    return container;
                }
            });

            $scope.controls.custom.push(new MyControl());

          var openPostModal = function(){
            var modalInstance = $modal.open({
              templateUrl: 'templates/post_modal.html',
              controller: 'PostModalCtrl',
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };

        }
    ]);