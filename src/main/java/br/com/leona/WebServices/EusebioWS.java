package br.com.leona.WebServices;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/eusebio",
        encoders = {EusebioEncoder.class},
        decoders = {EusebioDecoder.class})
public class EusebioWS {
    
    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnOpen
    public void onOpen(Session peer){
        peers.add(peer);
    }
    
    @OnClose
    public void onClose(Session peer){
        peers.remove(peer);
    }
    
    @OnMessage
    public void conectarDados(Objeto object, Session session) throws IOException, EncodeException {
        System.out.println("Dados: "+object);
        for(Session peer:peers){
            if (!peer.equals(session)){
                peer.getBasicRemote().sendObject(object);;
            }
        }
    }
    
}
