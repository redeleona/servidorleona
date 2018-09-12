app.controller('UsuarioCtrl', function ($rootScope, $location, $scope, usuarioService)
{
    var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario.tipo !== 'Administrador'){
        location.href = 'login.html';
    }
    $rootScope.activetab = $location.path();
    $scope.detalhesUsuario = false;

    $scope.buscarUsuarios = function () {
        usuarioService.buscarUsuarios()
                .success(function (retorno) {
                    $scope.usuarios = retorno;
                })
    }

    $scope.mudarStatusUsuario = function (usuario) {
        usuarioService.mudarStatusUsuario(usuario.email)
                .success(function (retorno) {
                    if (usuario.status=='Ativo'){
                        usuario.status = 'Inativo';
                    }else{
                        usuario.status = 'Ativo';
                    }
                })
    }
    $scope.verDetalhesUsuario = function (usuario) {
        $scope.usuarioDetalhe = usuario;
        $scope.detalhesUsuario = true;
    }
    $scope.fecharDetalhes = function () {
        $scope.detalhesUsuario = false;
    }
    $scope.editarSenhaUsuario = function(usuario){
        $scope.usuarioDetalhe = usuario;
        $scope.editarDadosUsuario = true;
    }
    $scope.editarSenha = function(){
        if (($scope.senhaUsuario==undefined)||($scope.senhaUsuario=='')){
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
            })
        }
    }
});