angular.module('loginService', [])
    .service('loginService', function ($http) {
        return{
            logarUsuario: function(usuario){
                return $http.post('/leona-novo/rest/usuario2/logarUsuario',usuario);
            },
            cadastrarUsuario: function(usuario){
                return $http.post('/leona-novo/rest/usuario2/cadastrarUsuario',usuario);
            },
            recuperarSenha: function(email){
                return $http.get('/leona-novo/rest/usuario2/recuperarSenha/'+email);
            }
        }
    })