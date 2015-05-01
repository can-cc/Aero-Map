AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.LoginView = Backbone.View.extend({
    el: '.am-panel',

    events: {
      'click #l_ok': 'login',
      'click #l_test': 'test',
    },

  test: function(){
    $.ajax({
      method: 'GET',
      url: AeroMap.setting.serverDomain + '/user/test',
      success: function(data){
        alert(data);
      },
      error: function(error){
        alert(JSON.stringify(error));
      }
    });
  },

    login: function(event) {
      event.preventDefault();
      var username = $('#l_username'),
          password = $('#l_password');
      $.ajax({
        method: 'POST',
        url: AeroMap.setting.serverDomain + '/loginbypp',
        data: {
          username: username,
          password: password
        },
        success: function(data){
          alert(data);
        },
        error: function(error){
          alert(JSON.stringify(error));
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