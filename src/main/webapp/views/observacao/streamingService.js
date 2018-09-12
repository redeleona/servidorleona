//Websocket client para leitura do streaming das cameras   
app.service('streamingService', function (){    
    return function(addr,el) {
            var socket = new WebSocket('ws://' + addr + '/ws');
                        
            socket.onmessage = function (evt) {
                if(document.getElementById(el) !== null) {
                    document.getElementById(el).innerHTML = evt.data;
                } else {
                    socket.close();
                }
            };

            socket.onerror = function (evt) {
                console.info('Ws streaming erro ' + evt);
            };

            socket.onopen = function () {
                console.info('Ws streaming conectado');
            };

            socket.onclose = function () {
                console.info('Ws streaming desconectado');
                if(document.getElementById(el) !== null) {
                    document.getElementById(el).innerHTML = 'Serviço Indisponível';
                    window.setTimeout(attemptConnection, 1000);
               }
            };
    };       
});
