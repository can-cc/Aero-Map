/*global Author:Tyan*/

AeroMap.Routers = AeroMap.Routers || {};

AeroMap.Routers.AppRouter = Backbone.Router.extend({
    hasSkeleton: false,

    routes: {

        'register': 'route_register',
        'login': 'route_login',
        'logout': 'route_logout',

        'map': 'route_map',
        'profile': 'route_profile'
    },

    loadskeleton: function(callback) {
        AeroMap.Skeleton = AeroMap.Skeleton || new AeroMap.Views.Skeleton();
        AeroMap.Skeleton.render(callback);
        hasSkeleton = true;
    },

  isLogin: function(callback) {

    },

    route_map: function() {
        AeroMap.Map = AeroMap.Map || new AeroMap.Views.MapView();
        AeroMap.Map.show();
    },

    route_profile: function() {
        AeroMap.ProfileView = AeroMap.ProfileView || new AeroMap.Views.ProfileView();
        AeroMap.ProfileView.render();
        AeroMap.ProfileView.show();
    },

    route_login: function() {
        if (AeroMap.LoginView) {
            AeroMap.LoginView.initialize();
        }
        AeroMap.LoginView = new AeroMap.Views.LoginView();
    },

    route_register: function() {
        if (AeroMap.RegisterView) {
            AeroMap.RegisterView.initialize();
        }
        AeroMap.RegisterView = new AeroMap.Views.RegisterView();
    },

    route_logout: function() {

    },

    clean_all: function() {

    }

});