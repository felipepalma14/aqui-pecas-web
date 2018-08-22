(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.servicos')
        .factory('APIService', APIService);

    APIService.$inject = ['$http', '$rootScope','AuthenticationService',
                         '$timeout','$firebaseArray','$firebaseObject'];
    
    function APIService($http, $rootScope,AuthenticationService, $timeout,$firebaseArray,$firebaseObject) {
        var ref = firebase.database().ref();
        var service = {
            getPecaPorEmpresa: function getPecaPorEmpresa(produtoKey,callback){
                var objProduto = $firebaseObject(ref.child('produtoEmpresa/'+produtoKey ));
                callback(objProduto);
               // objProduto.$loaded().then(function(result){
                 //   callback(result);
                
               // });
                
                               
            },
            getEmpresas : function getEmpresas(){
                var empresas = ref.child("empresas");
                return $firebaseArray(empresas);
            },
            getProdutos : function getProdutos(){
                var produtos = ref.child('produtos');
                var retorno = $firebaseArray(produtos);
                return retorno;
            },         

            getCategoria: function getCategoria(categoria,callback){
                var objCategoria = $firebaseObject(ref.child('categorias/'+categoria ));
                callback(objCategoria);
                
            },
            
            getCategorias: function getCategorias(){
                var categorias = $firebaseArray(ref.child('categorias'));
                return categorias;

            },

            getModelo: function getModelo(keyModelo,callback){
                var retorno;
                ref.child("modelos/"+keyModelo+"/modelo")
                    .on("child_added",function(snap){
                        retorno = snap.val();
                        return callback(retorno); 
                    });
            },

            getMarcas: function getMarcas(){
                var marcas = $firebaseArray(ref.child('marcas'));
                return marcas;

            },
            getModelos: function getModelos(){
                var modelos = $firebaseArray(ref.child('modelos'));
                return modelos;

            },
            getAnos: function getAnos(){
                var anos = $firebaseArray(ref.child('anos'));
                return anos;

            },

            addMarca: function addMarca(marca,callback){
                //getMarcas().$add(marca);
                var marcas = $firebaseArray(ref.child('marcas'));
                var retorno = null;
                marcas.$loaded(function(data){
                    var encontrei = false;
                    for(var i =0; i < data.length;i++){
                        
                        if(data[i].codigo === marca.codigo){ 
                            encontrei = true;
                             callback(data[i].$id);
                        }
                    }
                    if(encontrei === false){
                        marcas.$add(marca)
                            .then(function(result){
                            console.log(result.key);
                            retorno = result.key;
                             callback(retorno);
                        });
                    }

                });

            },
            addAno: function addAno(ano,callback){
                var anos = this.getAnos();
                anos.$loaded(function(data){
                    var encontrei = false;
                    for(var i =0; i < data.length;i++){
                        
                        if(data[i].codigo === ano.codigo){
                            encontrei = true;
                             callback(data[i].$id);
                        }
                    }
                    if(encontrei === false){
                        anos.$add(ano).then(function(result){
                            //console.log(result.key);
                            
                             callback(result.key);
                        });
                    }
                });
            },
            addModelo: function addModelo(categoria,callback){
                var modelos = this.getModelos();
                modelos.$loaded(function(data){
                    var encontrei = false;
                    for(var i =0; i < data.length;i++){
                        
                        if(data[i].codigo === modelo.codigo){
                            encontrei = true;
                             callback(data[i].$id);
                        }
                    }
                    if(encontrei === false){
                        modelos.$add(modelo).then(function(result){
                            //console.log(result.key);
                            
                            callback(result.key);
                        });
                    }
                });
            },
            addCategoria: function addCategoria(categoria,callback){
                var categorias = this.getCategorias();
                categorias.$add(categoria).then(function(result){
                    callback(result);       
                });
            },
           
            /*
            addProduto: function addProduto(produto,callback){
                var produtos = this.getProdutos();
                var keyCategoria = {};
                

                keyCategoria[produto.categoria.$id] = true;
                produto.categoria = null;
                produto.categoria = keyCategoria;
                if(produto.imagem['file']){
                    console.log("CAIU AQUI - NOVO");
                    var nomeImagem  = produto.imagem.file.name;
                    var storageRef = firebase.storage().ref('produtos/'+ nomeImagem);
                    var uploadTask = storageRef.put(produto.imagem.file);
                    uploadTask.on('state_changed', function(snapshot){
                          // Observe state change events such as progress, pause, and resume
                          // See below for more detail
                        }, function(error) {
                          // Handle unsuccessful uploads
                        }, function() {
                            produto.imagem = uploadTask.snapshot.downloadURL;
                            produtos.$add({
                                nome            : produto.nome,
                                imagem          : produto.imagem,
                                referencia      : produto.referencia,
                                categoria       : produto.categoria,
                                data_criacao    : firebase.database.ServerValue.TIMESTAMP
                            }).then(function(result){
                                var produtoEmpresaRef = $firebaseArray(ref.child("produtoEmpresa"));
                                var produtoEmpresa = {};
                                produtoEmpresa['nome']       = produto.nome;
                                produtoEmpresa['imagem']     = produto.imagem;
                                produtoEmpresa['referencia'] = produto.referencia;
                                produtoEmpresa['categoria']  = produto.categoria;
                                produtoEmpresa['empresaKey'] = AuthenticationService.currentUser.uid;
                                produtoEmpresa['data_atualizacao'] = firebase.database.ServerValue.TIMESTAMP;
                                produtoEmpresa['descricao']  = produto.descricao;
                                produtoEmpresa['produtoKey'] = result.key;
                                produtoEmpresa['preco']      = produto.preco;

                                var produtosRef = ref.child('produtos/' + result.key + '/empresas');
                                var produtosRefArray = $firebaseArray(produtosRef);
                                //TESTE ADD KEY EMPRESA em PRODUTO
                                produtosRefArray.$add(AuthenticationService.currentUser.uid);
                                   
                                produtoEmpresaRef.$add(produtoEmpresa).then(function(keyProdutoEmpresa){
                                                
                                    
                                    return callback(keyProdutoEmpresa.key);
                            
                                });
                            });
                        });
                }
            },*/
            atualizaProduto: function atualizaProduto(produto,callback){
                var keyCategoria = {};
                console.log(AuthenticationService.GetCurrentUser().uid);
                
                if(produto.hasOwnProperty("$id")){
                    
                    produto.data_atualizacao = firebase.database.ServerValue.TIMESTAMP;

                    callback(produto.$id);
                }
            },
            addProduto: function addProduto(produto,callback){
                var produtos = this.getProdutos();
                var keyCategoria = {};
                console.log(AuthenticationService.GetCurrentUser().uid);
                keyCategoria[produto.categoria.$id] = true;
                produto.categoria = keyCategoria;

                if(produto.hasOwnProperty("$id")){
                    var produtoEmpresaRef = $firebaseArray(ref.child("produtoEmpresa"));
                    var produtoEmpresa = {};
                    produtoEmpresa['nome']       = produto.nome;
                    produtoEmpresa['imagem']     = produto.imagem;
                    produtoEmpresa['referencia'] = produto.referencia;
                    produtoEmpresa['categoria']  = produto.categoria;
                    produtoEmpresa['empresaKey'] = AuthenticationService.GetCurrentUser().uid;
                    produtoEmpresa['data_atualizacao'] = firebase.database.ServerValue.TIMESTAMP;
                    produtoEmpresa['descricao']  = produto.descricao;
                    produtoEmpresa['produtoKey'] = produto.$id;
                    produtoEmpresa['isDisponivel'] = produto.isDisponivel;
                    produtoEmpresa['preco']      = produto.preco;

                    
                    produtoEmpresaRef
                        .$add(produtoEmpresa)
                        .then(function(keyProdutoEmpresa){ 
                            console.log(produto); 
                            console.log(keyProdutoEmpresa)    
                            callback(keyProdutoEmpresa.key);

                        }).catch(function(e){
                            console.log(e);
                        });
                }else{
                    console.log(produto);
                    produtos.$add({
                        nome            : produto.nome,
                        imagem          : produto.imagem,
                        referencia      : produto.referencia,
                        categoria       : produto.categoria,
                        data_criacao    : firebase.database.ServerValue.TIMESTAMP
                        }).then(function(result){
                            var produtoEmpresaRef = $firebaseArray(ref.child("produtoEmpresa"));
                            var produtoEmpresa = {};
                            produtoEmpresa['nome']       = produto.nome;
                            produtoEmpresa['imagem']     = produto.imagem;
                            produtoEmpresa['referencia'] = produto.referencia;
                            produtoEmpresa['categoria']  = produto.categoria;
                            produtoEmpresa['empresaKey'] = AuthenticationService.GetCurrentUser().uid;
                            produtoEmpresa['data_atualizacao'] = firebase.database.ServerValue.TIMESTAMP;
                            produtoEmpresa['descricao']  = produto.descricao;
                            produtoEmpresa['produtoKey'] = result.key;
                            produtoEmpresa['isDisponivel'] = produto.isDisponivel;
                            produtoEmpresa['preco']      = produto.preco;

                            console.log(produto);

                            var produtosRef = ref.child('produtos/' + result.key + '/empresas');
                            var produtosRefArray = $firebaseArray(produtosRef);
                            //TESTE ADD KEY EMPRESA em PRODUTO
                            //produtosRefArray.$add(AuthenticationService.currentUser.uid);
                               
                            produtoEmpresaRef
                                .$add(produtoEmpresa)
                                .then(function(keyProdutoEmpresa){  
                                    console.log(keyProdutoEmpresa)    
                                    callback(keyProdutoEmpresa.key);

                            }).catch(function(e){
                                console.log(e);
                            });
                        }).catch(function(e){
                            console.log(e);
                        });
                }
            },
            addModelosPeca : function addModelosPeca(carros, refProdutoEmpresa,callback){
                callback("lol");
            },
            pecasPorEmpresa: function pecasPorEmpresa(empresaKey,callback){
                ref.child('produtoEmpresa').on('value',function(dataSnapshotProdutos){
                    var produtos = [];
                    dataSnapshotProdutos.forEach(function(childProduto){
                        var id = childProduto.key;
                        var produto  = childProduto.val();
                        if(produto.empresaKey === empresaKey){
                            produtos.push(produto);
                        }
                    });
                    return callback(produtos);
                });            
            },
            pecasPorEmpresa2: function pecasPorEmpresa2(empresaKey,callback){
                var listaProdutos = $firebaseArray(ref.child('produtoEmpresa'));
                var produtos = [];
                listaProdutos.$loaded().then(function(){
                    angular.forEach(listaProdutos, function(produtoObject, index) {
                        if(produtoObject.empresaKey === empresaKey)
                            produtos.push(produtoObject);
                    });
                   callback(produtos);
                });
                               
            }
        };

        return service;
    }
})();
