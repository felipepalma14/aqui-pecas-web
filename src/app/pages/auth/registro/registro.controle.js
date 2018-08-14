(function() {
  'use strict';

  angular.module('BlurAdmin.pages.usuario')
    .controller('registroCtrl', registroCtrl);

  /** @ngInject */
  function registroCtrl($scope,$state,mapService,$timeout,fileReader,$filter,$window,AuthenticationService) {
    $scope.local = {};
    $scope.novoUsuario = {};

    $scope.registrar= function(){
     /* if($scope.novoUsuario.senha != $scope.confirmaSenha){
        alert("Verifique sua senha");
        return 
      }
      */
      $scope.novoUsuario.getPos = {'lat': mapService.markers[0].position.lat(),
                            'lng': mapService.markers[0].position.lng()};
      console.log($scope.novoUsuario);
      
    	AuthenticationService.Registro($scope.novoUsuario,function(retorno){
    		// trabalhar retorno callback - "novoUsuario"
    		alert("Usuario Cadastrado: " + retorno);
        console.log(retorno);
        $state.transitionTo("dashboard");
    	});
      
    };

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
            $scope.novoUsuario.imagem = e.target.result;
           });
        }

    $scope.imageUpload = function(element){
          var reader = new FileReader();
          reader.onload = $scope.imageIsLoaded;
          reader.readAsDataURL(element.target.files[0]);
          
    };

    $scope.pesquisarLocal = function(local) {
        /*
          REDIRECIONA POSIÇÃO DO MAPA
        */
        $scope.apiError = false;
        mapService.search(local)
        .then(
            function(res) { // success
                mapService.redirecionar(res);

                //console.log(mapService.markers.length);
                
               
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    };


    $timeout(function(){
      mapService.init();
    }, 100);
    
  }

})();