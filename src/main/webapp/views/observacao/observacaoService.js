app.service('observacaoService', function ($http) {
        return{
            salvarObservacao: function(observacao){
                return $http.post('/leona-novo/rest/observacao2/cadastrarObservacao', observacao);
            },
            retornarObservacoesFuturas: function(){
                return $http.get('/leona-novo/rest/observacao2/retornarObservacoesFuturas');
            },
            retornarObservacoesRealizadas: function(){
                return $http.get('/leona-novo/rest/observacao2/retornarObservacoesRealizadas');
            },
            retornarObservacoesAndamento: function(){
                return $http.get('/leona-novo/rest/observacao2/retornarObservacoesAndamento');
            },
            buscarLogsSalvos: function(id){
                return $http.get('/leona-novo/rest/observacao2/buscarLogsSalvos/'+id);
            },
            buscarChatSalvo: function(id){
                return $http.get('/leona-novo/rest/observacao2/buscarChatSalvo/'+id);
            },
            enviarMensagemChat: function(objeto){
                return $http.post('/leona-novo/rest/observacao2/enviarMensagemChat',objeto);
            },
            retornarStatusEstacoes: function(nome){
                return $http.post('http://'+nome+':8084/comunicacao-estacao-leona/comunicacao90-');
            }
        };
    });