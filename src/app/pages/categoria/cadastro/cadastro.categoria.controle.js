(function() {
  'use strict';
  angular.module('BlurAdmin.pages.categoria')
    .controller('categoriaCadastroCtrl', categoriaCadastroCtrl);

  /** @ngInject */
  function categoriaCadastroCtrl($scope,$rootScope, $state,fileReader,
                      $firebaseArray,$firebaseStorage,$filter,APIService,FIPEService) {
    /*
      Iniciando variaves de Scope
    */

    $scope.cadastrarCategoria = function(categoria){
      APIService.addCategoria(categoria,function(resultado){
        if(resultado){
          console.log(resultado);
          $scope.feedback = "Categoria cadastrada!!!";
        }
      });
    };
    
  }

})();