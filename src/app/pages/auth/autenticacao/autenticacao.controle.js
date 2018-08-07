(function() {
  'use strict';

  angular.module('BlurAdmin.pages.autenticacao')
    .controller('autenticacaoCtrl', autenticacaoCtrl);

  /** @ngInject */
  function autenticacaoCtrl($scope,$state,$rootScope,$window,AuthenticationService) {
    var vm = this;

    vm.logar = logar;

    init();

    function init() {
      $window.localStorage.clear();
    }

    function logar(email,senha) {
      AuthenticationService.Login(email,senha, function(resposta){
        if(resposta.hasOwnProperty("code")){
          if(resposta.code === "auth/user-not-found"){
          alert("Usuario não cadastrado!!");
          }
          if(resposta.code === "auth/wrong-password"){
            alert("Usuario não cadastrado ou senha invalida");
          }  
        }
        
        if(resposta.hasOwnProperty("empresa")){
          //console.log(resposta);
          alert("Seja Bem Vindo: " + resposta.empresa);
          $rootScope.currentUser = resposta;
          $state.go('dashboard');
        }
        if(resposta){
          //console.log(resposta);
          alert("Seja Bem Vindo: " + "Administrador");
          $rootScope.currentUser = resposta;
          $state.go('dashboard');
        }
        else{
          alert("Usuario não cadastrado ou senha invalida");
        }
      });
    }


  }

})();