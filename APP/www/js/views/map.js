AeroMap.Views = AeroMap.Views || {}


'use strict'

AeroMap.Views.MapView = Backbone.View.extend({
    el: '.am-map',

    other_el: '.am-context',

    position: null,

    map: null,

    initialize: function() {
        L.mapbox.accessToken = 'pk.eyJ1IjoidnRjaDk5IiwiYSI6IlRFVlFoTkEifQ.YD7Rx4C15GrS25eAJcuZtQ'
        this.render()
    },

    render: function() {
        this.map = L.mapbox.map(this.el, 'vtch99.lea375p3')
    },

    show: function() {
        $(this.other_el).hide()
        this.$el.show()
    },

    foot_record: function(position) {
        
    },

    location: function(position) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.position = position
            this.move_center(position)
            this.foot_record(position)
            },
            this.get_position_error, {
                enableHighAccuracy: true
            })
    },

    move_center: function (position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        this.map.setView([40, -74.50], 9)
    }

})
