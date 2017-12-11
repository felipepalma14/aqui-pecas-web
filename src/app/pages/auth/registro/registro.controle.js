(function() {
  'use strict';

  angular.module('BlurAdmin.pages.registro')
    .controller('registroCtrl', registroCtrl);

  /** @ngInject */
  function registroCtrl($scope,$state,mapService,$timeout,fileReader, 
  						$filter,$window,AuthenticationService) {
    $scope.local = {};
    $scope.novoUsuario = {};

    $scope.registrar= function(){
    	AuthenticationService.Registro($scope.novoUsuario,function(retorno){
    		// trabalhar retorno callback - "novoUsuario"
    		alert("Usuario Cadastrado: " + retorno);
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
          console.log(element.target.files[0])
          reader.readAsDataURL(element.target.files[0]);
          
    };

    $scope.pesquisarLocal = function(local) {
        $scope.apiError = false;
        mapService.search(local)
        .then(
            function(res) { // success
                mapService.addMarker(res);
                $scope.local.nome = res.name;
                $scope.local.lat = res.geometry.location.lat();
                $scope.local.lng = res.geometry.location.lng();
                $scope.novoUsuario.getPos = {'lat': res.geometry.location.lat(),
            								'lng': res.geometry.location.lng()};
               
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