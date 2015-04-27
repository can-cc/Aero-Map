AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.RegisterView = Backbone.View.extend({
    el: '.main-container',

    initialize: function() {
      this.render();
    },

    render: function() {
        var self = this;
        $.get('/templates/register.html', function(data) {
            $(self.el).html(data);
        });
    },

    show: function() {

    },

    clean: function() {

    }
});