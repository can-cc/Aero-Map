AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.MapView = Backbone.View.extend({
    el: '.am-map',

    other_el: '.am-context',

    position: null,

    map: null,

    initialize: function () {
        L.mapbox.accessToken = 'pk.eyJ1IjoidnRjaDk5IiwiYSI6IlRFVlFoTkEifQ.YD7Rx4C15GrS25eAJcuZtQ';
        this.render();
    },

    render: function () {
        this.map = L.mapbox.map(this.el, 'vtch99.lea375p3');
    },

    show: function () {
        $(this.other_el).hide();
        this.$el.show();
        this.location(this.position);
    },

    foot_record: function (position) {

    },

    location: function (map_location) {
        var b_move_center = this.move_center.bind(this);
        var b_location_error = this.location_error.bind(this);
        navigator.geolocation.getCurrentPosition(function(position) {
            map_location = position;
            b_move_center(position);
        }, b_location_error, {
                enableHighAccuracy: true
            });
    },

    move_center: function (position) {
        var latitude = position.coords.latitude;
        console.log(latitude);
        var longitude = position.coords.longitude;
        this.map.setView([latitude, longitude],  AeroMap.Options.Map_Default);
    },

    location_error: function () {
        
    }

});
