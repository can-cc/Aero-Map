AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.UploadAAvatar = Backbone.View.extend({
  el: '.main-container',

  initialize: function () {
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/templates/login.html', function(data){
      $(self.el).html(data);
    });
  },

  show: function() {

  },

  clean: function() {

  }
});
