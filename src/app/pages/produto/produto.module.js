(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.produto', [
			'BlurAdmin.pages.produto.cadastro',
			'BlurAdmin.pages.produto.listagem',
			'BlurAdmin.pages.produto.detalhes'])
		.config(routeConfig);
	function routeConfig($stateProvider){
		$stateProvider
		    .state('produto', {
	          	url: '/produto',
	          	template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
	          	abstract: true,
	          	title: 'Produto',
	          	sidebarMeta: {
	            	icon: 'ion-gear-a',
	            	order: 100,
	          },
	        });
		
	}
})();