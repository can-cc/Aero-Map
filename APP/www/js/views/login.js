AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.LoginView = Backbone.View.extend({
    el: '.panel',

    events: {
        'click #l_ok': 'login'
    },
    login: function() {

    },

    initialize: function() {
        this.render();
        _.bindAll(this, 'cleanup');
    },

    render: function() {
        var self = this;
        $.ajax({
            method: 'GET',
            url: AeroMap.setting.serverDomain + '/templates/login.html',
            success: function(data) {
                $(self.el).html(data);
            },
            error: function(error) {
                alert(JSON.stringify(error));
            }
        });
    },

    show: function() {

    },

    cleanup: function() {
        this.undelegateEvents();
        $(this.el).empty();
    }
});