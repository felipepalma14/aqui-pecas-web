(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.autenticacao', [])
		.config(routeConfig);
	function routeConfig($stateProvider){
		$stateProvider
			.state('autenticar',{
				url: '/autenticar',
		        templateUrl: 'app/pages/auth/autenticacao/autenticacao.html',
		        title: 'Autenticar',
		        controller: 'autenticacaoCtrl',
		        sidebarMeta: {
		          order: 800,
		        },
		        authenticate: false
		      });
		
	}
})();