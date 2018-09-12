app.controller('ImagemCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});