AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.LoginView = Backbone.View.extend({
  el: '.main-container',


  initialize: function() {
    _.bindAll(this, 'cleanup');
  },

  render: function(callback) {
    var self = this;
    $.ajax({
      method: 'GET',
      url: AeroMap.setting.serverDomain + '/templates/skeleton.html',
      success: function(data) {
        $(self.el).html(data);
        callback();
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