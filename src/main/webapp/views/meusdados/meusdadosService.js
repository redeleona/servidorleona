app.service('meusdadosService', function ($http) {
        return{
            editarMeusDados: function(objeto){
                return $http.post('/leona-novo/rest/usuario/editarMeusDados',objeto);
            }
        }
    })