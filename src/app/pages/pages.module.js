/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages', [
      'ui.router',
      'ui.mask',
      'BlurAdmin.pages.dashboard',
      'BlurAdmin.pages.servicos',
      //'BlurAdmin.pages.ui',
      //'BlurAdmin.pages.form',
      //'BlurAdmin.pages.tables',
      'BlurAdmin.pages.profile',
      'BlurAdmin.pages.usuario',
      'BlurAdmin.pages.categoria',
      'BlurAdmin.pages.produto',
      

    ])
    .config(routeConfig)
    .run(stateChangeStart);

  /** @ngInject */
   function stateChangeStart($rootScope, $state, AuthenticationService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      
      var login = AuthenticationService.GetCurrentUser();
      $rootScope.currentUser = login;
      $rootScope.logout = function(){
        AuthenticationService.Logout();
        $state.transitionTo("usuario.autenticar");
      }
      if (toState.authenticate && login == null) {
        // User isn’t authenticated
        $state.transitionTo("usuario.autenticar");
        event.preventDefault();
      }
    });
  };

  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    /*
    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    */
  };

})();
