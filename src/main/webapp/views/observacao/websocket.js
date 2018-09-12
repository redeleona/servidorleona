var estacao = localStorage.getItem('estacaoObs');
var nomeWS = '';

if (estacao==='São José dos Campos'){nomeWS = 'saojose';}

var wsUri = 'ws://'+document.location.host+nomeWS;
console.log(wsUri);