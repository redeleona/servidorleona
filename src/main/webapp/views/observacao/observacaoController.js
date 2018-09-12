app.controller('ObservacaoCtrl', function ($rootScope, $location, $scope, estacaoService, observacaoService, $http, pantiltControlService)
{
    //View mode
    var vm = this;
    //Constante com IP do servidor
    $scope.server = '150.163.105.2:8080';
    //$scope.server = 'localhost';
    //Inicia comunicaÃ§Ã£o com a estaÃ§Ã£o e utilizada para coletar o item de status da EstaÃ§Ã£o
    $scope.statusEstacaoSJC = {};
    $scope.statusEstacaoSJCccst = {};
    $scope.statusEstacaoCuiaba = {};
    $scope.statusEstacaoEusebio = {};
    $scope.statusEstacaoFraiburgo = {};

    $rootScope.activetab = $location.path();
    $scope.divCadastroObservacao = false;
    $scope.botaoNovaObservacao = true;
    $scope.botaoSalvarObservacao = true;
    $scope.obsFuturas = false;
    $scope.obsRealizadas = false;
    $scope.obsAndamento = false;
    $scope.obsLogs = false;
    $scope.futuras = [];
    $scope.realizadas = [];
    $scope.andamento = [];
    $scope.dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.meses = [
        {nome: "Janeiro", valor: "01"},
        {nome: "Fevereiro", valor: "02"},
        {nome: "Março", valor: "03"},
        {nome: "Abril", valor: "04"},
        {nome: "Maio", valor: "05"},
        {nome: "Junho", valor: "06"},
        {nome: "Julho", valor: "07"},
        {nome: "Agosto", valor: "08"},
        {nome: "Setembro", valor: "09"},
        {nome: "Outubro", valor: "10"},
        {nome: "Novembro", valor: "11"},
        {nome: "Dezembro", valor: "12"}
    ];
    $scope.anos = [new Date().getFullYear(), new Date().getFullYear() + 1];
    $scope.horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    $scope.minutos = [];
    for (var m = 0; m <= 59; m++) {
        var n = m;
        if (n < 10) {
            n = '0' + n;
        }
        $scope.minutos.push('' + n);
    };

    $scope.observacaoCadastro = {
        estacao: '',
        diaInicio: '',
        mesInicio: '',
        anoInicio: '',
        diaFim: '',
        mesFim: '',
        anoFim: '',
        horaInicio: '',
        horaFim: '',
        minInicio: '',
        minFim: ''
    };

    $scope.fecharDivNovaObservacao = function () {
        $scope.divCadastroObservacao = false;
        $scope.divObservacaoTipoNormal = false;
        $scope.divObservacaoTipoCampanha = false;
        $scope.botaoNovaObservacao = true;
    };
    
    $scope.fecharDivNovaObservacaoNormal = function () {
        $scope.divObservacaoTipoNormal = false;
        $scope.botaoNovaObservacao = true;
    };
    $scope.fecharDivNovaObservacaoCampanha = function () {
        $scope.divObservacaoTipoCampanha = false;
        $scope.botaoNovaObservacao = true;
    };

    $scope.abrirDivNovaObservacao = function () {
        $scope.divCadastroObservacao = true;
        $scope.botaoNovaObservacao = false;
    };
    
    $scope.observacaoTipoNormal = function () {
        $scope.divObservacaoTipoNormal = true;
        $scope.botaoNovaObservacao = false;
    };
    
    $scope.observacaoTipoCampanha = function () {
        $scope.divObservacaoTipoCampanha = true;
        $scope.botaoNovaObservacao = false;
    };
    
    $scope.retornarEstacoes = function () {
        estacaoService.buscarEstacoes()
                .success(function (retorno) {
                    $scope.estacoes = retorno;
                });
    };

    $scope.retornarObservacoesFuturas = function () {
        observacaoService.retornarObservacoesFuturas()
                .success(function (retorno) {
                    console.log(retorno);
                });
    };

    $scope.retornarObservacoesRealizadas = function () {
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
                    var hora = dataAgora.getHours();
                    if (hora < 10) {
                        hora = "0" + hora;
                    }
                    var min = dataAgora.getMinutes();
                    if (min < 10) {
                        min = "0" + min;
                    }
                    dataAgora = "" + dataAgora.getFullYear() + mes + dia + hora + min;
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
                            $scope.realizadas.push(item);
                        } else {
                            if (dataObsInicio < dataAgora) {
                                $scope.andamento.push(item);
                            } else {
                                $scope.futuras.push(item);
                            }
                        }
                    });
                    $scope.andamento.forEach(function (item) {
                        if (item.estacao === 'São José dos Campos') {
                            vm.statusEstacao = {
                                //Inicia variavel de controle do  status da estaÃ§Ã£o
                                controlbox: pantiltControlService($scope.server + '/sjc1/', $scope, $scope.statusEstacaoSJC)
                            };
                            item.status = $scope.statusEstacaoSJC;
                        }
                        if (item.estacao === 'São José dos Campos CCST') {
                            vm.statusEstacao = {
                                //Inicia variavel de controle do  status da estaÃ§Ã£o
                                controlbox: pantiltControlService($scope.server + '/sjcCCST1/', $scope, $scope.statusEstacaoSJCccst)
                            };
                            item.status = $scope.statusEstacaoSJCccst;
                        }
                        if (item.estacao === 'Cuiabá') {
                            vm.statusEstacao = {
                                //Inicia variavel de controle do  status da estaÃ§Ã£o
                                //ConfiguraÃ§Ã£o do servidor
                                controlbox: pantiltControlService($scope.server + '/cba1/', $scope, $scope.statusEstacaoCuiaba)
                            };
                            item.status = $scope.statusEstacaoCuiaba;
                        }
                        if (item.estacao === 'Eusébio') {
                            vm.statusEstacao = {
                                //Inicia variavel de controle do  status da estaÃ§Ã£o
                                controlbox: pantiltControlService($scope.server + '/eusebio1/', $scope, $scope.statusEstacaoEusebio)
                            };
                            item.status = $scope.statusEstacaoEusebio;
                        }
                        if (item.estacao === 'Fraiburgo') {
                            vm.statusEstacao = {
                                //Inicia variavel de controle do  status da estaÃ§Ã£o
                                controlbox: pantiltControlService($scope.server + '/fraiburgo1/', $scope, $scope.statusEstacaoFraiburgo)
                            };
                            item.status = $scope.statusEstacaoFraiburgo;
                        }
                    });

                });
    };

    $scope.retornarObservacoesAndamento = function () {
        observacaoService.retornarObservacoesAndamento()
                .success(function (retorno) {
                    console.log(retorno);
                });
    };

    $scope.salvarObservacao = function () {
        $scope.respostaCadastroObservacao = "AGUARDE...";
        $scope.botaoSalvarObservacao = false;
        $scope.observacaoCadastro['usuarioCriador'] = $scope.usuarioLogado.email;
        observacaoService.salvarObservacao($scope.observacaoCadastro)
                .success(function (retorno) {
                    if (retorno.status === 1) {
                        $scope.respostaCadastroObservacao = retorno.resposta;
                    } else {
                        $scope.divCadastroObservacao = false;
                        $scope.obsFuturas = true;
                        $scope.obsRealizadas = false;
                        $scope.obsAndamento = false;
                        location.reload();
                    }
                    $scope.botaoSalvarObservacao = true;
                });
    };

    $scope.divRealizadas = function () {
        $scope.obsFuturas = false;
        $scope.obsRealizadas = true;
        $scope.obsAndamento = false;
        $scope.obsLogs = false;
    };
    $scope.divFuturas = function () {
        $scope.obsFuturas = true;
        $scope.obsRealizadas = false;
        $scope.obsAndamento = false;
        $scope.obsLogs = false;
    };
    $scope.divAndamento = function () {
        $scope.obsFuturas = false;
        $scope.obsRealizadas = false;
        $scope.obsAndamento = true;
        $scope.obsLogs = false;
    };

    $scope.iniciarObservacao = function (estacao) {
        localStorage.setItem('estacaoObs', JSON.stringify(estacao));
    };

    $scope.buscaLog = function (id, nomeEstacao) {
        observacaoService.buscarLogsSalvos(id)
                .success(function (r) {
                    $scope.show = (r.length === 0);
                    $scope.titulo = nomeEstacao;
                    $scope.logs = r;
                    $scope.obsRealizadas = false;
                    $scope.obsLogs = true;
                });
    };
});

app.controller('TransmissaoCtrl', function ($rootScope, $location, $scope, observacaoService, $timeout, pantiltControlService, streamingService, chatService)
{
    //Constante com o IP do Servidor
    $scope.server = '150.163.105.2:8080';
    //Constante de streaming da cÃ¢mera
    $scope.tagCamera1 = '';
    $scope.tagCamera2 = '';
    //Constante de IP das etaÃ§Ãµes
    $scope.ipEstacao = '';

    $rootScope.activetab = $location.path();
    $scope.estacao = JSON.parse(localStorage.getItem('estacaoObs'));
    $scope.acoes = true;
    $scope.respostaAcoes = '';
    $scope.contagem = '';
    $scope.divBarra = false;
    var nomeWS = '';
    $scope.ipWS = '';
    var acao = {
        graus: '',
        movimento: '',
        usuario: '',
        datahora: '',
        emailusuario: '',
        idobservacao: '',
        acao: '',
        log: ''
    };
    $scope.listaAcoes = [];

    if ($scope.estacao.estacao === 'São José dos Campos') {
        nomeWS = 'saojose';
        $scope.ipEstacao = $scope.server + '/sjc';  //Fornece o IP da EstaÃ§Ã£o
        $scope.sjc = true;
        $scope.sjcCCST = false;
        $scope.cuiaba = false;
        $scope.eusebio = false;
        $scope.fraiburgo = false;
    }
    if ($scope.estacao.estacao === 'São José dos Campos CCST') {
        nomeWS = 'saojoseCCST';
        $scope.ipEstacao = $scope.server + '/sjcCCST';  //Fornece o IP da EstaÃ§Ã£o
        $scope.sjc = false;
        $scope.sjcCCST = true;
        $scope.cuiaba = false;
        $scope.eusebio = false;
        $scope.fraiburgo = false;
    }
    if ($scope.estacao.estacao === 'Cuiabá') {
        nomeWS = 'cuiaba';
        $scope.ipEstacao = $scope.server + '/cba';  //variavel de teste
        $scope.sjc = false;
        $scope.sjcCCST = false;
        $scope.cuiaba = true;
        $scope.eusebio = false;
        $scope.fraiburgo = false;
    }
    if ($scope.estacao.estacao === 'Fraiburgo') {
        nomeWS = 'fraiburgo';
        $scope.ipEstacao = $scope.server + '/fraiburgo';  //Fornece o IP da EstaÃ§Ã£o
        $scope.sjc = false;
        $scope.sjcCCST = false;
        $scope.cuiaba = false;
        $scope.eusebio = false;
        $scope.fraiburgo = true;
    }
    
    if ($scope.estacao.estacao === 'Eusébio') {
        nomeWS = 'eusebio';
        $scope.ipEstacao = $scope.server + '/eusebio';  //Fornece o IP da EstaÃ§Ã£o
        $scope.sjc = false;
        $scope.sjcCCST = false;
        $scope.cuiaba = false;
        $scope.eusebio = true;
        $scope.fraiburgo = false;
    }

    function preencherObjeto(graus, mov) {
        acao = new Object();
        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var hora = data.getHours();
        var min = data.getMinutes();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (hora < 10) {
            hora = '0' + hora;
        }
        if (min < 10) {
            min = '0' + min;
        }
        acao.graus = graus;
        acao.movimento = mov;
        acao.datahora = dia + '/' + mes + '/' + data.getFullYear() + ' ' + hora + ':' + min;
        acao.usuario = JSON.parse(localStorage.getItem('usuarioLogado')).nome + ' ' + JSON.parse(localStorage.getItem('usuarioLogado')).sobrenome;
        acao.idobservacao = $scope.estacao.id;
        acao.emailusuario = JSON.parse(localStorage.getItem('usuarioLogado')).email;
        acao.log = "True";
    };

    $scope.buscarLogsSalvos = function () {
        $scope.corpoLogAcoes = false;
        observacaoService.buscarLogsSalvos($scope.estacao.id)
                .success(function (retorno) {
                    $scope.listaAcoes = retorno.reverse();
                });
    };

    $scope.abrirLogAcoes = function () {
        $scope.corpoLogAcoes = true;
    };
    $scope.fecharLogAcoes = function () {
        $scope.corpoLogAcoes = false;
    };
    
    //pagina de load
    var i = setInterval(function () {
        clearInterval(i);
        // The desired code is only this:
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";

    }, 12000);


    function preencherLista(acao) {
        $scope.listaAcoes.reverse();
        $scope.listaAcoes.push(acao);
        $scope.listaAcoes.reverse();
        $scope.$digest();
    }
    ;

    $scope.progress = 0;
    $scope.isRunning = false;
    $scope.tempo;

    var DOTS = '....................................................................................................';
    var PIPES = '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||';
    var isRunning = true;

    $scope.progress_bar = function () {
        return '[' + PIPES.substring(0, $scope.progress) + DOTS.substring(0, 100 - $scope.progress) + ']';
    };

    function tick() {
        if ($scope.progress < 100) {
            $scope.progress++;
            $timeout(tick, $scope.tempo);
            $scope.isRunning = true;
        } else {
            $scope.isRunning = false;
        }
    };

    $scope.ligarCamera = function () {
        var data = new Date();
        var hora = data.getHours();
        if ((hora > 5) && (hora < 6)) {
            $scope.respostaAcoes = "Horário nÃo permitido pra esta ação!";
        } else {
            $scope.divBarra = true;
            $scope.acoes = false;
            $scope.respostaAcoes = "INICIANDO CÂMERAS...";
            preencherObjeto('', 'Ligar e Gravar');
            acao = JSON.stringify(acao);
            vm.camera1.controlbox.send('{"camera": "True"}');
            //Inializar a gravaÃ§Ã£o das cÃ¢meras nas estaÃ§Ãµes
            vm.camera1.controlbox.send('{"gravar" : "True"}');
            vm.camera2.controlbox.send('{"gravar" : "True"}');
            observacaoService.enviarMensagemChat(acao)
                            .success(function () {
                                console.log("Gravou log no BD");
                    });
            vm.chat.mensagem.send('{"log":"True"}');
            $scope.progress = 0;
            $scope.tempo = 100;
            $timeout(tick, 0);
            setTimeout(function () {
                $scope.acoes = true;
                $scope.respostaAcoes = '';
                //preencherLista(JSON.parse(acao));
                $scope.divBarra = false;
            }, 5000);
        }
    };

    $scope.desligarCamera = function () {
        var data = new Date();
        var hora = data.getHours();
        if ((hora > 5) && (hora < 6)) {
            $scope.respostaAcoes = "Horário não permitido pra esta ação!";
        } else {
            $scope.divBarra = true;
            $scope.acoes = false;
            $scope.respostaAcoes = "Finalizando CÂMERAS...";
            preencherObjeto('', 'Desligar e Parar de Gravar');
            acao = JSON.stringify(acao);
            vm.camera1.controlbox.send('{"camera": "False"}');
            //Finalizar a gravaÃ§Ã£o das cÃ¢meras nas estaÃ§Ãµes
            vm.camera1.controlbox.send('{"gravar" : "False"}');
            vm.camera2.controlbox.send('{"gravar" : "False"}');
            observacaoService.enviarMensagemChat(acao)
                            .success(function () {
                                console.log("Gravou log no BD");
                    });
            vm.chat.mensagem.send('{"log":"True"}');
            $scope.progress = 0;
            $scope.tempo = 100;
            $timeout(tick, 0);
            setTimeout(function () {
                $scope.acoes = true;
                $scope.respostaAcoes = '';
                //preencherLista(JSON.parse(acao));
                $scope.divBarra = false;
            }, 5000);
        }
    };

    $scope.resetarCamera = function () {
        $scope.divBarra = true;
        $scope.acoes = false;
        $scope.respostaAcoes = "RESETANDO...";
        preencherObjeto('', 'Resetar');
        acao = JSON.stringify(acao);
        vm.camera1.controlbox.send('{"elevacao":"' + "-35" + '"}', '{"azimute":"' + "0" + '"}');
        observacaoService.enviarMensagemChat(acao)
                .success(function () {
                    console.log("Gravou log no BD");
        });
        vm.chat.mensagem.send('{"log":"True"}');
        $scope.progress = 0;
        $scope.tempo = 500;
        $timeout(tick, 0);
        setTimeout(function () {
            $scope.acoes = true;
            $scope.respostaAcoes = '';
            $scope.divBarra = false;
        }, 30000);
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    ;

    $scope.moverAzimute = function () {
        if (($scope.camera1.azimute === undefined) || ($scope.camera1.azimute === null) || ($scope.camera1.azimute === '')) {
            $scope.respostaAcao = 'Digite o valor de azimute';
        } else {
            if (isNumber($scope.camera1.azimute)) {
                if (parseInt($scope.camera1.azimute) > 350) {
                    $scope.respostaAcao = 'Valor Azimute excedeu o limite!';
                } else {
                    $scope.divBarra = true;
                    $scope.acoes = false;
                    $scope.respostaAcoes = "MOVENDO AZIMUTE...";
                    preencherObjeto($scope.camera1.azimute, 'Azimute');
                    vm.camera1.controlbox.send('{"azimute":"' + $scope.camera1.azimute + '"}');
                    observacaoService.enviarMensagemChat(acao)
                            .success(function () {
                                console.log("Gravou log no BD");
                            });
                    vm.chat.mensagem.send('{"log":"True"}');
                    $scope.progress = 0;
                    $scope.tempo = 250;
                    $timeout(tick, 0);
                    setTimeout(function () {
                        $scope.acoes = true;
                        $scope.respostaAcoes = '';
                        //preencherLista(JSON.parse(acao));
                        $scope.divBarra = false;
                    }, 10000);
                }
            } else {
                $scope.respostaAcao = 'Digite apenas números';
            }
        }
    };

    $scope.moverElevacao = function () {
        if (($scope.camera1.elevacao === undefined) || ($scope.camera1.elevacao === null) || ($scope.camera1.elevacao === '')) {
            $scope.respostaAcao = 'Digite o valor de elevação';
        } else {
            if (isNumber($scope.camera1.elevacao)) {
                if ((parseInt($scope.camera1.elevacao) < -35) || (parseInt($scope.camera1.elevacao) > 35)) {
                    $scope.respostaAcao = 'Valor Elevação excedeu o limite';
                } else {
                    $scope.divBarra = true;
                    $scope.acoes = false;
                    $scope.respostaAcoes = "MOVENDO ELEVAÇÃOO...";
                    preencherObjeto($scope.camera1.elevacao, 'Elevação');
                    acao = JSON.stringify(acao);
                    vm.camera1.controlbox.send('{"elevacao":"' + $scope.camera1.elevacao + '"}');
                    observacaoService.enviarMensagemChat(acao)
                            .success(function () {
                                console.log("Gravou log no BD");
                    });
                    vm.chat.mensagem.send('{"log":"True"}');
                    $scope.progress = 0;
                    $scope.tempo = 250;
                    $timeout(tick, 0);
                    setTimeout(function () {
                        $scope.acoes = true;
                        $scope.respostaAcoes = '';
                        //preencherLista(JSON.parse(acao));
                        $scope.divBarra = false;
                    }, 10000);
                }
            } else {
                $scope.respostaAcao = 'Digite apenas números';
            }
        }
    };

    $scope.buscarChatSalvo = function () {
        $scope.corpoChat = false;
        observacaoService.buscarChatSalvo($scope.estacao.id)
                .success(function (retorno) {
                    $scope.listaChat = retorno.reverse();
                });
    };
    $scope.abrirCorpoChat = function () {
        $scope.corpoChat = true;
    };
    $scope.fecharCorpoChat = function () {
        $scope.corpoChat = false;
    };
    $scope.enviarMensagemChat = function () {
        if (($scope.msg === undefined) || ($scope.msg === '')) {
            alert('Digite uma mensagem');
        } else {
            var data = new Date();
            var dia = data.getDate();
            if (dia < 10) {
                dia = '0' + dia;
            }
            var mes = data.getMonth() + 1;
            if (mes < 10) {
                mes = '0' + mes;
            }
            var hora = data.getHours();
            var min = data.getMinutes();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (min < 10) {
                min = '0' + min;
            }
            var ano = data.getFullYear();
            var objeto = {
                msg: $scope.msg,
                usuario: $scope.usuarioLogado.nome,
                dthr: dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min,
                idobservacao: $scope.estacao.id,
                log: 'False'
            };
            observacaoService.enviarMensagemChat(objeto)
                    .success(function () {
                        acao = JSON.stringify(objeto);
                        vm.chat.mensagem.send(acao);
                    });
        }
    };

    var vm = this;

    //Inicia constantes de controle para streaming de imagens e controle do pantiltt
    $scope.camera1 = {};
    $scope.camera2 = {};

    //VariÃ¡vel Ipcam1:(string) Monta string com IP e Porta para acesso ao streaming da cÃ¢mera 1
    //ConfiguraÃ§Ã£o do servidor
    var ipCam1 = $scope.ipEstacao + '1/';
    //Controle da cÃ¢mera 1
    vm.camera1 = {
        //controla o streaming de imagem da camera 1     
        socket: streamingService(ipCam1, 'tagCamera1'),
        //controla a movimentaÃ§Ã£o do pantilt e gravaÃ§Ã£o da camera 1
        controlbox: pantiltControlService(ipCam1, $scope, $scope.camera1)
    };

    //VariÃ¡vel Ipcam2:(string) Monta string com IP e Porta para acesso ao streaming da cÃ¢mera 2
    //CONFIGURAÃ‡ÃƒO do servidor
    var ipCam2 = $scope.ipEstacao + '2/';
    //Controle da cÃ¢mera 2
    vm.camera2 = {
        //controla o streaming de imagem da camera 2  
        socket: streamingService(ipCam2, 'tagCamera2'),
        //controla a gravaÃ§Ã£o da camera 2
        controlbox: pantiltControlService(ipCam2, $scope, $scope.camera2)
    };

    $scope.chat = {};
    //Controle do chat de conversa durante observaÃ§Ã£o em uma estaÃ§Ã£o
    vm.chat = {
        //controla envio e recebimento de mensagens na estaÃ§Ã£o em observaÃ§Ã£o
        mensagem: chatService($scope, preencherLista, nomeWS, ipCam1)
    };
});
