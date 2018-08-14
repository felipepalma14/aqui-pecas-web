/*(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.usuario', ['ui.select', 'ngSanitize'])
		.config(routeConfig);
	function routeConfig($stateProvider){
		$stateProvider
		    .state('usuario', {
	          	url: '/usuario',
	          	template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
	          	abstract: true,
	          	title: 'Usuario',
	          	sidebarMeta: {
	            	icon: 'ion-gear-a',
	            	order: 250,
	          },
	        })
	        .state('autenticar',{
				url: '/autenticar',
		        templateUrl: 'app/pages/auth/autenticacao/autenticacao.html',
		        title: 'Autenticar',
		        controller: 'autenticacaoCtrl',
		        sidebarMeta: {
		          order: 100,
		          icon: 'ion-gear-a',
		        },
		      });
		
	}
})();*/

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.usuario', ['ui.select', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('usuario', {
	          	url: '/usuario',
	          	template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
	          	abstract: true,
	          	title: 'Usuário',
	          	sidebarMeta: {
	            	icon: 'ion-gear-a',
	            	order: 250,
	          },
	        })
	        .state('usuario.autenticar',{
				url: '/autenticar',
		        templateUrl: 'app/pages/auth/autenticacao/autenticacao.html',
		        title: 'Autenticar',
		        controller: 'autenticacaoCtrl',
		        sidebarMeta: {
		          order: 100,
		          icon: 'ion-gear-a',
		        },
		      })
	        .state('usuario.registrar', {
	          url: '/registrar',
	          templateUrl: 'app/pages/auth/registro/registro.html',
	          controller: 'registroCtrl',
	          title: 'Registro',
	          sidebarMeta: {
	             order: 30,
	              icon: 'ion-gear-a',
	          },
	          authenticate: false
	        });
  }
})();
