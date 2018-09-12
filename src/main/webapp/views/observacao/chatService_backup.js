 //Websocket client para leitura e envio de comandos de controle do pantilt
app.service('chatService',  function () {        
 //Websocket client para leitura e envio de comandos de controle do pantilt
    return function(scope, funcaoPreencherLista, nomeWS) {
        
            var socket = new WebSocket('ws://' + document.location.host + '/leona-novo/' + nomeWS);
            //webSocket.binaryType = 'arraybuffer';
            
            socket.onmessage = function (evt) {
                console.log('Ws Chat: ' + evt.data);
                var objeto = JSON.parse(evt.data);
                if (objeto.datahora === undefined) {
                    var lista = scope.listaChat.reverse();
                    lista.push(objeto);
                    scope.listaChat = lista.reverse();
                    scope.respostaAcoes = 'NOVA MENSAGEM NO CHAT!';
                    scope.$digest();
                    setTimeout(function () {                           
                                scope.respostaAcoes = '';
                            }, 1250);
                } else {
                    funcaoPreencherLista(objeto);
                }
            };

            socket.onerror = function () {
                console.info('Ws chat erro');
            };

            socket.onopen = function () {
                console.info('Ws chat conectado');
            };

            socket.onclose = function () {
                console.info('Ws chat desconectado');                
            };
            
          return socket;
    };
});