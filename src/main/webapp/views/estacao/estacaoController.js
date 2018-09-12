app.controller('EstacaoCtrl', function ($rootScope, $location, $scope, estacaoService)
{
    var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    $scope.botaoNovaEstacao = true;
    $scope.botaoEditarEstacao = true;
        $scope.botaoExcluirEstacao = true;
    if (usuario.tipo!=='Administrador'){
        $scope.botaoNovaEstacao = false;
        $scope.botaoEditarEstacao = false;
        $scope.botaoExcluirEstacao = false;
    }
    $rootScope.activetab = $location.path();
    $scope.divDetalhesEstacao = false;
    $scope.divCadastroEstacao = false;
    $scope.divEdicaoEstacao = false;
    $scope.focarNome = true;
    $scope.estacoes = [];
    $scope.estacao = {
        cidade: '',
        estado: '',
        pais: '',
        nomeContato: '',
        emailContato: '',
        telefoneContato: ''
    };    
    $scope.buscarEstacoes = function () {
        estacaoService.buscarEstacoes()
                .success(function(retorno){
                    $scope.estacoes = retorno;
        });
    };
    $scope.verDetalhesEstacao = function(estacao){
        $scope.estacaoDetalhe = estacao;
        $scope.divDetalhesEstacao = true;
    };
    $scope.fecharDivDetalhesEstacao = function () {
        $scope.divDetalhesEstacao = false;
    };
    $scope.fecharDivNovaEstacao = function () {
        $scope.divCadastroEstacao = false;
    };
    $scope.abrirDivDetalhesEstacao = function () {
        $scope.divDetalhesEstacao = true;
    };
    $scope.abrirDivNovaEstacao = function () {
        $scope.divCadastroEstacao = true;
        console.log($scope.mapa);
    };
    $scope.cadastrarEstacao = function () {
         if ($scope.estacao.cidade === '') {$scope.respostaCadastroEstacao = 'Cidade é obrigatória!';} else {
            estacaoService.cadastrarEstacao($scope.estacao)
                    .success(function(retorno){
                        if (retorno.status==1){
                            $scope.respostaCadastroEstacao = retorno.resposta;
                        }else{
                            location.reload();    
                        }                        
            });
        }
    };
    $scope.buscarDadosGoogle = function(){
        if ($scope.estacao.cidade === '') {
            $scope.respostaCadastroEstacao = 'Cidade é obrigatória!';
        } else {
            $scope.respostaCadastroEstacao = '';
            estacaoService.retornarDadosGoogle($scope.estacao.cidade)
                    .success(function (retorno) {
                        $scope.estacao.estado = retorno.results[0].address_components[2].long_name;
                        $scope.estacao.pais = retorno.results[0].address_components[3].long_name;
                        $scope.estacao["latitude"] = ''+retorno.results[0].geometry.location.lat;
                        $scope.estacao["longitude"] = ''+retorno.results[0].geometry.location.lng;
                    });
        }
    };
    $scope.excluirEstacao = function(){
        estacaoService.excluirEstacao($scope.estacaoDetalhe)
                .success(function(retorno){
                    location.reload();
        })
    };
    $scope.divEditarEstacao = function(estacaoDetalhes){
        $scope.estacao = estacaoDetalhes;
        $scope.divDetalhesEstacao = false;
        $scope.divEdicaoEstacao = true;
        
    };
    $scope.fecharDivEditarEstacao = function(){
        $scope.divEdicaoEstacao = false;
    };
    $scope.editarEstacao = function(){
        estacaoService.editarEstacao($scope.estacao)
                .success(function(retorno){
                    location.reload();
        })
    }
});