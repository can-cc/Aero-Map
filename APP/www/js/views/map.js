AeroMap.Views = AeroMap.Views || {}


'use strict'

AeroMap.Views.MapView = Backbone.View.extend({
    el: '.am-map',
    map: null,
    initialize: function() {
        L.mapbox.accessToken = 'pk.eyJ1IjoidnRjaDk5IiwiYSI6IlRFVlFoTkEifQ.YD7Rx4C15GrS25eAJcuZtQ'
        L.mapbox.map(this.el, 'vtch99.lea375p3')
    },
    render: function() {
        this.map = L.mapbox.map(this.el, 'vtch99.lea375p3')
    }
    
})
