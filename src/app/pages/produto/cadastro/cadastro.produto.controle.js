(function() {
  'use strict';

  angular.module('BlurAdmin.pages.produto')
    .controller('produtoCadastroCtrl', produtoCadastroCtrl);

  /** @ngInject */
  function produtoCadastroCtrl($scope,$rootScope, $state,fileReader,
                      $firebaseArray,$firebaseStorage,$filter,APIService,FIPEService) {
    /*
      Iniciando variaves de Scope
    */
    var vm = this;
    var ref = firebase.database().ref();
    vm.novoProduto = {};

 
    vm.novoProduto.imagem = $filter('appImage')('theme/no-photo.png');

    vm.categoria = {};
    vm.novoProduto = {};
    vm.carro = {};

    vm.carros = [];

    vm.precoSlider = {
      inicial: 0,
      final: 2000,
    };

    vm.selCategoria = function(item){
      vm.novoProduto.categoria = item;
    }

    vm.selProduto = function(item){
      vm.novoProduto = item;
      
    }
    vm.produtos = APIService.getProdutos();

    vm.categorias = APIService.getCategorias();

    FIPEService.getMarcasFIPE().success(function(dados){
      vm.marcas = dados;
    });

    //
    vm.onMarcaSelected = function(item){
      //alert(item);
      FIPEService.getModelosFIPE(item).success(function(dados){
        //console.log(dados.modelos);
        vm.modelos=dados.modelos;

        vm.carro.marca = item;
      });
    }

    vm.onModeloSelected = function(itemModelo){
      vm.carro.modelo = itemModelo;
      FIPEService.getAnosFIPE(vm.carro.marca,vm.carro.modelo).success(function(dados){
        vm.anos  = dados;
      });
    }

    vm.addCarro = function(item){
      console.log(item);
      var carro = {};
      carro.marca = item.marca;
      carro.modelo = item.modelo;
      carro.ano = item.ano;
      
      vm.carros.push(carro);
      alert("Adicionado");
    }

    vm.removeCarro = function(index){
      
      vm.carros.splice(index, 1);
      console.log(index);
      alert("Removido");
    }


    vm.removePicture = function () {
      vm.novoProduto.imagem = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    vm.uploadPicture = function () {
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
      console.log(produto);
      APIService.addProduto(produto,function(retorno){
        console.log(retorno);
        if(retorno != null){
          addModelosInPeca(retorno);
          vm.feedback = "Produto cadastrado com sucesso!!!";
        


        }
      });

    }

    function addModelosInPeca(keyProdutoEmpresa){
      //var produtoModeloRef = $firebaseArray(ref.child("produtoEmpresa/" + keyProdutoEmpresa + "/modelos"));
        for(let i=0; i < vm.carros.length; i++){
          APIService.addModelo(vm.carros[i].modelo,function(resultKeyModelo){
          var modeloRef = ref.child('modelos/'+ resultKeyModelo);
          var modeloMarcaRef = modeloRef.child("marca");

            APIService.addMarca(vm.carros[i].marca,function(resultKeyMarca){
              var keyMarca = {};
              keyMarca[resultKeyMarca]=true;
              modeloMarcaRef.set(keyMarca);                       
            });
            APIService.addAno(vm.carros[i].ano,function(resultKeyAno){
              var modeloAnosRef = modeloRef.child("anos/" + resultKeyAno);

              modeloAnosRef.set(true,function(error) {
                if (error) {
                  console.log("ERRO: Verificar os dados" + error);
                } else {
                  console.log("Ano inserido!!")
                }
              });

            });
            var produtoModeloRef = ref.child("produtoEmpresa/" + keyProdutoEmpresa + "/modelos/" + resultKeyModelo);
            //var keyProdutoModelo = {};
            //keyProdutoModelo[resultKeyModelo] = true;
            produtoModeloRef.set(true,function(error) {
                if (error) {
                  alert("Data could not be saved." + error);
                } else {
                  alert("Data saved successfully.");
                }
              });
          });
        }
      };
  }

})();