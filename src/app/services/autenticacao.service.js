(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.autenticacao')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http','$window','$rootScope', '$timeout','$firebaseAuth'];
    function AuthenticationService($http,$window,$rootScope, $timeout,$firebaseAuth,$firebaseObject) {
        var service = {};
        
        service.Login = Login;
        service.Logout = Logout;
        service.Registro = Registro;
        service.GetCurrentUser = GetCurrentUser;
        service.currentUser = null;
        return service;

        function GetCurrentUser(){
            for(var key in $window.localStorage){
                if(key.startsWith("firebase:authUser")){
                    var localStorageObject = $window.localStorage.getItem(key);
                    service.currentUser = JSON.parse(localStorageObject);
                }
            }
        }
       
        function Registro(usuarioInfor,callback) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(usuarioInfor.email,usuarioInfor.senha)
            .then(function(userUID) {
                userUID.updateProfile({
                    photoURL: usuarioInfor.imagem,       // <- URL from uploaded photo.
                    displayName: usuarioInfor.empresa
                }).then(function(){
                    var refEmpresa = firebase.database().ref().child('empresas/' + userUID.uid);
                    refEmpresa.set(
                          usuarioInfor
                        );
                });
                Reautenticar();

                callback(userUID);

            }).catch(function(error) {
                callback(error);
                console.log(error);
            }).finally(function(xx) {
                console.log("finally", xx);
            });
        }

        function Login(email,senha,callback) {
            var auth = $firebaseAuth();
            auth.$signInWithEmailAndPassword(email, senha)
                .then(function(authData) {
                    service.currentUser = authData;
                    $rootScope.user = {'email':email,'senha':senha};
                    console.log($rootScope.user);
                    callback(authData);

                }).catch(function(error) {
                    callback(error);
                    console.log(error);
                }).finally(function(xx) {
                    console.log("finally", xx);
                });
        }

        function Logout(){
            var auth = $firebaseAuth();

            auth.$signOut().then(function() {
              service.currentUser = null;
              //$window.localStorage.clear();
              $window.location.reload();
              //callback(service.currentUser);

            }).catch(function(error) {
              console.log('Error signing out:', error);
            });
            //service.currentUser
        };

        function Reautenticar() {
            var auth = $firebaseAuth();
            auth.$signOut().then(function() {
                
            }).catch(function(error) {
              console.log('Error signing out:', error);
            });
            Login($rootScope.user.email,$rootScope.user.senha,function(result){
                console.log("re login");
            });
        }
    }
})();
