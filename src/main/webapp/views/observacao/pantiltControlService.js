 //Websocket client para leitura e envio de comandos de controle do pantilt
app.service('pantiltControlService',  function () {        
 //Websocket client para leitura e envio de comandos de controle do pantilt
    return function(addr,scope,el) {
        
            var socket = new WebSocket('ws://' + addr + '/controlbox');
            
            socket.onmessage = function (evt) {
                //variável ctr: (.json) Monta log para analise no browser
                var ctr = angular.fromJson(evt.data);
                el.azimute = parseInt(ctr.azimute);
                el.elevacao = parseInt(ctr.elevacao);
                el.record = ctr.gravar;
                el.status = ctr.camera;
                el.statusEstacao = ctr.estadoEstacao; 
                console.log(evt.data);
                scope.$apply();
            };

            socket.onerror = function () {
                console.info('Ws pantilt erro');
            };

            socket.onopen = function () {
                console.info('Ws pantilt conectado');
            };

            socket.onclose = function () {
                console.info('Ws pantilt desconectado');
                console.info('Serviço Indisponível');
                window.setTimeout(attemptConnection, 1000);
            };
            
          return socket;
    };
});