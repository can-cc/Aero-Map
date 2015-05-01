angular.module('Aero', [
        'ui.router',
        'leaflet-directive',
        'Aero.controllers',
        'mm.foundation',
        'Aero.config'
    ])
    .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');
        $stateProvider
        // .state('app', {
        //   url: '/app',
        //   abstract: true,
        //   templateUrl: setting.server_domain + 'templates/skeleton.html',
        //   controller: 'SkeletonCtrl'
        // })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegCtrl'
            })
            .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            })
        .state('post', {
          url: '/post',
          templateUrl: 'templates/post.html',
          controller: 'PostCtrl'
        });


    });