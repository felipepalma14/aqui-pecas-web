(function() {
  'use strict';

  angular.module('BlurAdmin.pages.produto')
    .controller('produtoCadastroCtrl', produtoCadastroCtrl);

  /** @ngInject */
  function produtoCadastroCtrl($scope,$rootScope, $state,fileReader,$firebaseStorage,$filter,APIService,FIPEService) {
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


    $scope.categorias = APIService.getCategorias();

    FIPEService.getMarcasFIPE().success(function(dados){
      $scope.marcas = dados;
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
        $scope.anos  = dados;
      });
    }

    $scope.addCarro = function(item){
      var carro = {};
      carro.marca = item.marca;
      carro.modelo = item.modelo;
      carro.ano = item.ano;
      
      $scope.carros.push(carro);
      alert("Adicionado");
    }

    $scope.removeCarro = function(index){
      
      $scope.carros.splice(index, 1);
      console.log(index);
      alert("Removido");
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
          reader.readAsDataURL(element.target.files[0]);
          
    };

    vm.cadastrarProduto = function(produto){
      //APIService.addProduto(produto,function(){

      //});
      vm.feedback = "Produto cadastrado com sucesso!!!";
      console.log(produto);

    }

  }

})();