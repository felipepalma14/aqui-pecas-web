(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.categoria', [
			'BlurAdmin.pages.categoria.cadastro',])
		.config(routeConfig);
	function routeConfig($stateProvider){
		$stateProvider
		    .state('categoria', {
	          	url: '/categoria',
	          	template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
	          	abstract: true,
	          	title: 'Categoria',
	          	sidebarMeta: {
	            	icon: 'ion-gear-a',
	            	order: 100,
	          },
	        });
		
	}
})();