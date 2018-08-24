(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.servicos')
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
            var localStorageObject = $window.localStorage.getItem("usuarioSis");
            return JSON.parse(localStorageObject);
                
            
        }
       
        function Registro(usuarioInfor,callback) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(usuarioInfor.email,usuarioInfor.senha)
            .then(function(userUID) {
                usuarioInfor['uid'] = userUID.uid;

                var storage = firebase.storage();
                var storageRef = storage.ref();

                var file = usuarioInfor.empresa.replace(" ","_")+".jpg";
                var filesRef = storageRef.child('empresas/'+file);

                filesRef.putString(usuarioInfor.imagem,'data_url').then(function(data) {
                    var refEmpresa = firebase.database().ref().child('empresas/' + userUID.uid);
                    usuarioInfor.imagem = data.downloadURL;
                    refEmpresa.set(usuarioInfor);
                    
                    Reautenticar();

                    callback(userUID);
                });
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
                    // guarda o estado o usuario principal do sistema
                    console.log(authData);

                    var ref = firebase.database().ref();

                    ref.child("empresas/"+authData.uid)
                    .on("value",function(snap){
                        if(snap.val() !==null){
                            var retorno = snap.val(); 

                            retorno['isAdmin'] = false;
                            service.currentUser = retorno;
                            $window.localStorage.setItem('usuarioSis', JSON.stringify(retorno));
                            $rootScope.user = {'email':email,'senha':senha, 'isAdmin': false};

                            callback(retorno); 
                        }else{
                            authData['isAdmin'] = true;
                            service.currentUser = authData;
                            $rootScope.currentUser = {'email':email,'senha':senha, 'isAdmin': true};
                            $window.localStorage.setItem('usuarioSis', JSON.stringify(authData));
                            callback(authData);
                        }
                        
                    });
                    //callback(authData);

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
              $window.localStorage.clear();
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
