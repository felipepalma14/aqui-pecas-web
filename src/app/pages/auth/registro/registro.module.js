
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.registro', ['ui.select', 'ngSanitize',])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('registrar', {
          url: '/registrar',
          templateUrl: 'app/pages/auth/registro/registro.html',
          controller: 'registroCtrl',
          title: 'Registro',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          authenticate: false
        });
  };

})();
