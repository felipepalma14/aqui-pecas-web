(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.produto.listagem', ['ui.select', 'ngSanitize',])
		.config(routeConfig);
	function routeConfig($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('produto.listagem',{
				url: '/listagem',
		        templateUrl: 'app/pages/produto/listagem/listagem.produto.html',
		        title: 'Listagem',
		        controller: 'produtoListagemCtrl',
		        sidebarMeta: {
		          order: 100,
		          icon: 'ion-gear-a',
		        },
		        authenticate: false
		    });
		
	}
})();