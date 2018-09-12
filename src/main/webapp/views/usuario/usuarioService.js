app.service('usuarioService', function ($http) {
        return{
            buscarUsuarios: function(){
                return $http.get('/leona-novo/rest/usuario2/buscarUsuarios');
            },
            mudarStatusUsuario: function(email){
                return $http.get('/leona-novo/rest/usuario2/mudarStatusUsuario/'+email);
            },
            editarSenha: function(objeto){
                return $http.post('/leona-novo/rest/usuario2/editarSenha', objeto);
            },
            buscarNomeFoto: function(){
                return $http.get('/leona-novo/rest/usuario2/retornarNomeFoto');
            }
        }
    })