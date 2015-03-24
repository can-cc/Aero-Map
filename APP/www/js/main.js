//main.js Anthor: Tyan 2015.3.22


$(document).foundation()
$(function() {
    FastClick.attach(document.body)
})

window.AeroMap = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Options: {
        Map_Max: 13,
        Debug: true
    },
    init: function() {
        'use strict'
        Backbone.emulateJSON = true
        AeroMap.Router = new AeroMap.Routers.AppRouter()
        Backbone.history.start()
    }
}



$(document).ready(function() {
    'use strict'

    AeroMap.init()
})
