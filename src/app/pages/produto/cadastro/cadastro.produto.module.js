(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.produto.cadastro', ['ui.select', 'ngSanitize',])
		.config(routeConfig);
	function routeConfig($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('produto.cadastro',{
				url: '/cadastro',
		        templateUrl: 'app/pages/produto/cadastro/cadastro.produto.html',
		        title: 'Cadastro de Produtos',
		        controller: 'produtoCadastroCtrl',
		        controllerAs: 'vm',
		        sidebarMeta: {
		          order: 100,
		          icon: 'ion-gear-a',
		        },
		        authenticate: false
		    });
		
	}
})();