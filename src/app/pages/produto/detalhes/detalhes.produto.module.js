(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.produto.detalhes', ['ui.select', 'ngSanitize',])
		.config(routeConfig);
	function routeConfig($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('produto.detalhes',{
				url: '/detalhes/:id',
		        templateUrl: 'app/pages/produto/detalhes/detalhes.produto.html',
		        title: 'Detalhes',
		        controller: 'produtoDetalhesCtrl',
		        authenticate: true
		    });
		
	}
})();