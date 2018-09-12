app.service('chatService',  function () {        
//Websocket client para envio de mensagem
    return function(scope, funcaoPreencherLista, nomeWS, addr) {        
        var socket = new WebSocket('ws://' + addr + '/chat');

        socket.onmessage = function (evt) {
            console.log('Ws Chat: ' + evt.data);
            var objeto = JSON.parse(evt.data);               

            if (objeto.log === 'True') {
                scope.buscarLogsSalvos();
                scope.$digest();
            }
            else if (objeto.msg === 'WsChatConectado') {}
            else{
                var lista = scope.listaChat.reverse();
                lista.push(objeto);
                scope.listaChat = lista.reverse();
                scope.respostaAcoes = 'NOVA MENSAGEM NO CHAT!';
                scope.$digest();
                setTimeout(function () {                           
                        scope.respostaAcoes = '';
                        }, 1250);
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