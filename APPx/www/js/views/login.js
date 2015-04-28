AeroMap.Views = AeroMap.Views || {};

AeroMap.Views.LoginView = Backbone.View.extend({
    el: '.main-container',
    
    initialize: function () {
      this.render();
    },
    
    render: function() {
      var self = this;
      
      $(this.el).html('ssss');
      // $.get('http://192.168.42.1:3000/templates/login.html', function(data){
      //   $(self.el).html(data);
      //   alert('fuck');
      // }, function(error){
      //   alert(error);
      // });
      alert('before fuck');
      $.ajax({
        method: 'GET',
        url: 'http://10.42.0.30:3000/test',
        success: function(data){
         // $(self.el).html(data);
          alert(data);
        },
        error: function(error){
          alert(JSON.stringify(error));
        }
      });
    },

    show: function() {
        
    },

    clean: function() {
        
    }
});
