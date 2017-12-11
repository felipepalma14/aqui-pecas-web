(function() {
  'use strict';

  angular.module('BlurAdmin.pages.produto')
    .controller('produtoCadastroCtrl', produtoCadastroCtrl);

  /** @ngInject */
  function produtoCadastroCtrl($scope,$rootScope, $state,fileReader, $filter,APIService) {
    /*
      Iniciando variaves de Scope
    */
    $scope.categoria = {};
    $scope.novoProduto = {};

    $scope.precoSlider = {
      inicial: 0,
      final: 2000,
    };

    $scope.checkUP = function(valor){
      console.log(valor);
    };

    $scope.$watch('precoSlider', function(newValue, oldValue, scope) {
      console.log(scope);
      console.log(newValue);
    });
    //FIM

    $scope.atualiza= function(){
      console.log("teste");
    };

    function atualiza(){
      console.log("teste");
    };

    $scope.categorias = APIService.getCategorias();
    console.log($scope.categorias);

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };  
    $scope.imageIsLoaded = function(e){
           $scope.$apply(function() {
            $scope.picture = e.target.result;
           });
        }

    $scope.imageUpload = function(element){
          var reader = new FileReader();
          reader.onload = $scope.imageIsLoaded;
          console.log(element.target.files[0])
          reader.readAsDataURL(element.target.files[0]);
          
    };

  }

})();