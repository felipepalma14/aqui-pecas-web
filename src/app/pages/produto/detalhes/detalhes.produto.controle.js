(function() {
  'use strict';

  angular
  	.module('BlurAdmin.pages.produto.detalhes')
    .controller('produtoDetalhesCtrl', produtoDetalhesCtrl);

  /** @ngInject */
  	function produtoDetalhesCtrl($scope,$rootScope,$stateParams, $state,fileReader,
                      $firebaseArray,$firebaseStorage,$filter,APIService,FIPEService) {
  	
  		var keyProduto = $stateParams.id;
    	var ref = firebase.database().ref();
    	$scope.carro = {};
	    $scope.carros = [];

    	$scope.categorias = APIService.getCategorias();
    	FIPEService.getMarcasFIPE().success(function(dados){
	      $scope.marcas = dados;
	    });

    	APIService.getPecaPorEmpresa(keyProduto,function(produto){
    		
    		produto.$bindTo($scope,'novoProduto').then(function(){

    			console.log($scope.novoProduto);
    			$scope.categoriaProduto = APIService.getCategoria(Object.keys($scope.novoProduto.categoria),
    			function(categoria){
    				console.log(categoria);
    				$scope.categoria = {};
    				$scope.categoria['selecionada'] = categoria;
    			});
    		});
    		

    	});

    	$scope.selCategoria = function(item){
    		console.log(item);
    		$scope.novoProduto['categoria'] = {};
	      	$scope.novoProduto['categoria'][item.$id] = true;
	    };

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
      console.log(item);
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
      $scopenovoProduto.imagem = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };  
    $scope.imageIsLoaded = function(e){
           $scope.$apply(function() {
            $scope.novoProduto.imagem = e.target.result;
           });
        }

    $scope.imageUpload = function(element){
          var reader = new FileReader();
          reader.onload = $scope.imageIsLoaded;
          reader.readAsDataURL(element.target.files[0]);
          
    };

    $scope.cadastrarProduto = function(produto){
      APIService.atualizaProduto(produto,function(retorno){
        console.log(retorno);
        if(retorno != null){
          addModelosInPeca(retorno);
          $scope.feedback = "Produto Atualizado com sucesso!!!";

        }
      });

    }

    function addModelosInPeca(keyProdutoEmpresa){
      var produtoModeloRef = $firebaseArray(ref.child("produtoEmpresa/" + keyProdutoEmpresa + "/modelos"));
        for(let i=0; i < $scope.carros.length; i++){
          APIService.addModelo($scope.carros[i].modelo,function(resultKeyModelo){
          var modeloRef = ref.child('modelos/'+ resultKeyModelo);
          var modeloMarcaRef = modeloRef.child("marca");
          var modeloAnosRef = $firebaseArray(modeloRef.child("anos"));

            APIService.addMarca($scope.carros[i].marca,function(resultKeyMarca){
              var keyMarca = {};
              keyMarca[resultKeyMarca]=true;
                        modeloMarcaRef.set(keyMarca);                       
            });
            APIService.addAno($scope.carros[i].ano,function(resultKeyAno){
              var keyAno = {};
              keyAno[resultKeyAno]=true;
              modeloAnosRef.$loaded(function(data){
                          var encontrei = false;
                          for(var i =0; i < data.length;i++){
                              var keyModeloAno = Object.keys(data[i])[0];
                              if(keyModeloAno === resultKeyAno){
                                encontrei = true
                                break
                              }
                          }
                          if(encontrei === false){
                             console.log("Ano nao existe, vou adc");
                            modeloAnosRef.$add(keyAno); 
                          }
                          
                      });

            });
            var keyProdutoModelo = {};
            keyProdutoModelo[resultKeyModelo] = true;
            produtoModeloRef.$add(keyProdutoModelo).then(function(result){
                            console.log("PRoduto Modelo : " + result);
                        });

          });
        }
      };


  	}
  	
})();