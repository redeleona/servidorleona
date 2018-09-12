app.controller('DashboardCtrl', function($rootScope, $location, $scope,estacaoService,observacaoService,usuarioService)
{
    $rootScope.activetab = $location.path();
    $scope.andamento = [];
    
    if (($scope.usuarioLogado.nome==='')||($scope.usuarioLogado.email==='')||($scope.usuarioLogado.sobrenome==='')||
            ($scope.usuarioLogado.cidade==='')||($scope.usuarioLogado.instituicao==='')||($scope.usuarioLogado.pais==='')){
        $scope.avisoCadastro = true;
    }else{
        $scope.avisoCadastro = false;
    }
    
    $scope.buscarEstacoesDashboard = function () {
        estacaoService.buscarEstacoes()
                .success(function(retorno){
                    $scope.estacoes = retorno;
        });
    };
    
    $scope.retornarObservacoesDashboard = function () {
        observacaoService.retornarObservacoesRealizadas()
                .success(function (retorno) {
                    var dataAgora = new Date();
                    var mes = dataAgora.getMonth() + 1;
                    if (mes < 10) {
                        mes = "0" + mes;
                    }
                    var dia = dataAgora.getDate();
                    if (dia < 10) {
                        dia = "0" + dia;
                    }
                    dataAgora = "" + dataAgora.getFullYear() + mes + dia + dataAgora.getHours() + dataAgora.getMinutes();
                    retorno.forEach(function (item) {
                        if (item.diaInicio < 10) {
                            item.diaInicio = "0" + item.diaInicio;
                        }
                        var dataObsInicio = "" + item.anoInicio + item.mesInicio + item.diaInicio + item.horaInicio + item.minInicio;
                        if (item.diaFim < 10) {
                            item.diaFim = "0" + item.diaFim;
                        }
                        var dataObsFim = "" + item.anoFim + item.mesFim + item.diaFim + item.horaFim + item.minFim;
                        if (dataObsFim < dataAgora) {
                            
                        } else {
                            if (dataObsInicio < dataAgora) {
                                $scope.andamento.push(item);
                            } else {
                                
                            }
                        }
                    });
                });
    };
    $scope.buscarNomeFoto = function(){
        usuarioService.buscarNomeFoto()
                .success(function(retorno){
                    console.log(retorno.resposta);
            $scope.imagemurl = retorno.resposta;
        })        
    }
});