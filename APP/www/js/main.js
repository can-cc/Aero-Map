//main.js Anthor: Tyan 2015.3.22

$(function() {
    FastClick.attach(document.body);
});

$(document).foundation({
    offcanvas: {
        // Sets method in which offcanvas opens.
        // [ move | overlap_single | overlap ]
        open_method: 'move',
        // Should the menu close when a menu link is clicked?
        // [ true | false ]
        close_on_click: true
    }
});

window.AeroMap = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Options: {
        Map_Min: 13,
        Map_Default: 14,
        Debug: true
    },
    init: function() {
        'use strict';
        Backbone.emulateJSON = true;
        AeroMap.Router = new AeroMap.Routers.AppRouter();
        Backbone.history.start();
    }
};

$(document).ready(function() {
    'use strict';
  AeroMap.init();

  if(Cookies.get('aero-session') || window.location.hash === '#register'){
    window.location = '/#map';
  }else{
    window.location = '/#login';
  }
   
});