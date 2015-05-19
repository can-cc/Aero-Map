angular.module('Aero')
    .factory('chatsocket', [
      'socketFactory',
      'AeroConfig',
      function(
        socketFactory,
        AeroConfig) {

      return socketFactory({
        ioSocket: io.connect(AeroConfig.backend + '/')
      });

    }]);