(function() {
  'use strict';

  angular.module('BlurAdmin.pages.produto')
    .controller('produtoCadastroCtrl', produtoCadastroCtrl);

  /** @ngInject */
  function produtoCadastroCtrl($scope,$rootScope, $state,fileReader, $filter,APIService,FIPEService) {
    /*
      Iniciando variaves de Scope
    */
    var vm = this;
    vm.novoProduto = {};
    vm.novoProduto.imagem = $filter('appImage')('theme/no-photo.png');
    
    $scope.categoria = {};
    $scope.novoProduto = {};
    $scope.carro = {};

    $scope.carros = [];

    $scope.precoSlider = {
      inicial: 0,
      final: 2000,
    };

    $scope.selCategoria = function(item){
      vm.novoProduto.categoria = item;
    }

    $scope.$watch('vm.novoProduto', function() {
      console.log(vm.novoProduto);
    },vm.novoProduto);

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

    FIPEService.getMarcasFIPE().success(function(dados){
      $scope.marcas = dados;
      console.log(dados);
    });

    //
    $scope.onMarcaSelected = function(item){
      //alert(item);
      FIPEService.getModelosFIPE(item).success(function(dados){
        //console.log(dados.modelos);
        $scope.modelos=dados.modelos;

        $scope.carro.marca = item;
      });
    }

    $scope.onModeloSelected = function(itemModelo){
      $scope.carro.modelo = itemModelo;
      FIPEService.getAnosFIPE($scope.carro.marca,$scope.carro.modelo).success(function(dados){
        console.log(dados);
        $scope.anos  = dados;
      });
    }

    $scope.addCarro = function(item){
      $scope.carros.push(item);
      alert("Adicionado");
    }


    $scope.removePicture = function () {
      vm.novoProduto.imagem = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };  
    $scope.imageIsLoaded = function(e){
           $scope.$apply(function() {
            vm.novoProduto.imagem = e.target.result;
           });
        }

    $scope.imageUpload = function(element){
          var reader = new FileReader();
          reader.onload = $scope.imageIsLoaded;
          console.log(element.target.files[0])
          reader.readAsDataURL(element.target.files[0]);
          
    };

    $scope.cadastrarProduto = function(){
      console.log("teste");

    }

  }

})();