//app.controller('MeusDadosCtrl', function ($rootScope, $location, $scope, meusdadosService)
app.controller('MeusDadosCtrl', function ($rootScope, $location, $scope, meusdadosService, usuarioService)
{
    $rootScope.activetab = $location.path();
    $scope.detalhesUsuarioLogado = true;
    $scope.editarUsuarioLogado = false;
    $scope.usuarioDetalhe = JSON.parse(localStorage.getItem('usuarioLogado'));
    //Ana 16 /01/2018 mudar local de storage para um protegido

    $scope.editarDadosUsuarioLogado = function () {
        $scope.detalhesUsuarioLogado = false;
        $scope.editarUsuarioLogado = true;
    }

    $scope.editarMeusDados = function () {
        meusdadosService.editarMeusDados($scope.usuarioDetalhe)
                .success(function (retorno) {
                    if (retorno.status==1){
                        alert(retorno.resposta);
                    }else{
                        localStorage.setItem('usuarioLogado',JSON.stringify(retorno.map));
                        location.reload();
                    };                    
                });

    };
    
    $scope.editarSenhaUsuario = function(){
        $scope.editarDadosUsuario = true;
    };
    $scope.editarSenha = function(){
        if (($scope.senhaUsuario===undefined)||($scope.senhaUsuario==='')){
            alert('Digite a senha');
        }else{
            var objeto = {
                email: $scope.usuarioDetalhe.email,
                senha: $scope.senhaUsuario
            };
            usuarioService.editarSenha(objeto)
                    .success(function(r){
                        alert('Senha editada com sucesso!');
                $scope.editarDadosUsuario = false;
            });
        }
    };
    
    
});