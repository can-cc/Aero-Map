angular.module('Aero', [
        'ui.router',
        'leaflet-directive',
        'Aero.controllers',
        'Aero.config'
    ])
    .config(function($httpProvider, $stateProvider, $urlRouterProvider, AeroConfig) {
        $urlRouterProvider.otherwise('/login');
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
            });

    });