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
    init: function() {
        'use strict'
        Backbone.emulateJSON = true
        L.mapbox.accessToken = 'pk.eyJ1IjoidnRjaDk5IiwiYSI6IlRFVlFoTkEifQ.YD7Rx4C15GrS25eAJcuZtQ'
        L.mapbox.map('am-map', 'vtch99.lea375p3')
        // var map = new AeroMap.Views.MapView()
        // map.render()
        Backbone.history.start()
    }
}



$(document).ready(function() {
    'use strict'

    AeroMap.init()
})
