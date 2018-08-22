(function() {
	// body...
	'use strict';
	angular
		.module('BlurAdmin.pages.categoria.cadastro', ['ui.select', 'ngSanitize',])
		.config(routeConfig);
	function routeConfig($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('categoria.cadastro',{
				url: '/cadastro',
		        templateUrl: 'app/pages/categoria/cadastro/cadastro.categoria.html',
		        title: 'Cadastro',
		        controller: 'categoriaCadastroCtrl',
		        sidebarMeta: {
		          order: 100,
		          icon: 'ion-gear-a',
		        },
		        authenticate: true
		    });
		
	}
})();