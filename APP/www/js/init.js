
$(document).ready(function() {
    'use strict'

    AeroMap.init = function () {
        Backbone.emulateJSON = true
        AeroMap.Routers.AppRouter()
        Backbone.history.start()
    }
    AeroMap.init()
})
