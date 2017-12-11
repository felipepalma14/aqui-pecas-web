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
        if(resposta.uid){
          //console.log(resposta);
          alert("Seja Bem Vindo: " + resposta.email );
          AuthenticationService.GetCurrentUser();
          
          $rootScope.currentUser = AuthenticationService.currentUser;
          $state.go('dashboard');
        }else{
          alert(resposta.message);
        }
      });
    }


  }

})();