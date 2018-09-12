var app = angular.module('leona', ['ngRoute','ngMap']);

app.config(function ($routeProvider, $locationProvider)
{
    $locationProvider.hashPrefix(['!']);
    $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/usuario', {
                templateUrl: 'views/usuario/usuario.html',
                controller: 'UsuarioCtrl'
            })
            .when('/estacao', {
                templateUrl: 'views/estacao/estacao.html',
                controller: 'EstacaoCtrl'
            })
            .when('/observacao', {
                templateUrl: 'views/observacao/observacao.html',
                controller: 'ObservacaoCtrl'
            })
            .when('/observacao/:estacao', {
                templateUrl: 'views/observacao/transmissao.html',
                controller: 'TransmissaoCtrl'
            })
            .when('/imagem', {
                templateUrl: 'views/imagem/imagem.html',
                controller: 'ImagemCtrl'
            })
            .when('/meusdados', {
                templateUrl: 'views/meusdados/meusdados.html',
                controller: 'MeusDadosCtrl'
            })
            .otherwise({redirectTo: '/'});
});

app.controller('leonaController', function($scope){ 
    $scope.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        $scope.itemUsuario = true;
        if (($scope.usuarioLogado===null)||($scope.usuarioLogado===undefined)){
            location.href = 'login.html';
        }else{
            if ($scope.usuarioLogado.tipo !== 'Administrador'){
                $scope.itemUsuario = false;
            }
        }    
})