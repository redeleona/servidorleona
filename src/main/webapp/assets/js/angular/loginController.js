angular.module('loginController', [])
    .controller('loginController', function ($scope, loginService) {
        $scope.divcadastro = false;
        $scope.divlogin = true;
        $scope.botaoCadastro = true;
        $scope.botaoLogin = true;
        localStorage.clear();
        
        $scope.login = {
            email:'',
            senha:''
        };
        $scope.usuario = {
            nome:'',
            sobrenome:'',
            email:'',
            senha:'',
            instituicao:'',
            cidade:'',
            pais:'',
            dataNascimento:''
        };

        $scope.logarUsuario = function(){
            $scope.respostaLogin = "AGUARDE...";
            $scope.botaoLogin = false;
            loginService.logarUsuario($scope.login)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.respostaLogin = retorno.resposta;
                        $scope.botaoLogin = true;
                    }else{   
                        localStorage.setItem('usuarioLogado',JSON.stringify(retorno.map));
                        location.href = 'painel.html';
                    }
                })
                .error(function(){
                    $scope.respostaLogin = "Usuario/Senha inválidos";    
                })
        };
        $scope.mudarAba = function(){
            $scope.divcadastro = !$scope.divcadastro;
            $scope.divlogin = !$scope.divlogin;
        };
        $scope.cadastrarUsuario = function(){
            $scope.respostaCadastro = "AGUARDE...";
            $scope.botaoCadastro = false;
            loginService.cadastrarUsuario($scope.usuario)
                .success(function(retorno){
                    if (retorno.status === 1){
                        $scope.respostaCadastro = retorno.resposta;
                        $scope.botaoCadastro = true;
                    }else{                        
                        location.href = 'cadastrosucesso.html';
                    }
                });
        };
        $scope.recuperarSenha = function(){
            if ($scope.login.email===''){
                $scope.respostaLogin = "Digite seu e-mail";    
            }else{
                $scope.respostaLogin = "AGUARDE...";
                loginService.recuperarSenha($scope.login.email)
                        .success(function(retorno){
                            $scope.respostaLogin = retorno.resposta;
                });
            }
        };
        
        $scope.btnCadastrar = function() {
            $scope.divlogin = false;
            $scope.divcadastro = true;
        };
    });
