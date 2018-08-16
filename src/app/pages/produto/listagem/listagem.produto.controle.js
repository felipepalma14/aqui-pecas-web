(function() {
  'use strict';

  angular.module('BlurAdmin.pages.produto.listagem')
    .controller('produtoListagemCtrl', produtoListagemCtrl);

  /** @ngInject */
  function produtoListagemCtrl($scope,APIService,$rootScope,$firebaseAuth,$firebaseArray, $state) {
  		var authObj = $firebaseAuth();

  		var authData = authObj.$getAuth();

  		if (authData) {
		  console.log("Logged in as:", authData);
		  APIService.pecasPorEmpresa2(authData.uid,function(resultado){
		  		$scope.resultado = resultado;
		  		console.log($scope.resultado);

		  });
		} else {
		  console.log("Logged out");
		}
    

  };

})();