AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.RegisterView = Backbone.View.extend({
    el: '.panel',

    events: {
        'click #r_ok': 'register'
    },

    register: function(event) {
        event.preventDefault();
        var username = $('#r_username').val(),
            email = $('#r_email').val(),
            password = $('#r_password').val();
        $.ajax({
            method: 'POST',
            url: AeroMap.setting.serverDomain + '/signin',
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function(data) {
                if (data.error) {

                } else {
                    window.location.hash = '#login';
                }
            },
            error: function() {

            }
        });
    },

    initialize: function() {
        this.render();
        _.bindAll(this, 'cleanup');
    },

    render: function() {
        var self = this;
        $.ajax({
            method: 'GET',
            url: AeroMap.setting.serverDomain + '/templates/register.html',
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