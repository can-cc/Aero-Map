/*global Author:Tyan*/

AeroMap.Routers = AeroMap.Routers || {};

AeroMap.Routers.AppRouter = Backbone.Router.extend({
  
    routes: {
 
        'register': 'route_register',
        'login': 'route_login',
        'logout': 'route_logout',

        'map': 'route_map',
        'profile': 'route_profile'
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

  route_login: function(){
  
    new AeroMap.Views.LoginView();
  },

  route_register: function(){
    new AeroMap.Views.RegisterView();
  },

  route_logout: function(){

  }

});