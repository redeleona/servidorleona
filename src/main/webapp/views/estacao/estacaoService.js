app.service('estacaoService', function ($http) {
        return{
            retornarDadosGoogle: function(cidade){
                return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+cidade+',Brasil&key=AIzaSyCyNMbu_ROLyXAQIzqn6iUUybPT-34iXk8');
            },
            cadastrarEstacao: function(estacao){
                return $http.post('/leona-novo/rest/estacao/cadastrarEstacao', estacao);
            },
            buscarEstacoes: function(){
                return $http.get('/leona-novo/rest/estacao/retornarEstacoes');
            },
            excluirEstacao: function(estacao){
                return $http.post('/leona-novo/rest/estacao/excluirEstacao',estacao);
            },
            editarEstacao: function(estacao){
                return $http.post('/leona-novo/rest/estacao/editarEstacao',estacao);
            }
        }
    })