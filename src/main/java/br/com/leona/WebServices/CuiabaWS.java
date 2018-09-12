package br.com.leona.WebServices;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/cuiaba",
        encoders = {CuiabaEncoder.class},
        decoders = {CuiabaDecoder.class})
public class CuiabaWS {
    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnOpen
    public void onOpen(Session peer){
        System.out.println("Cuiaba Ws Chat conectado: ");
        
        peers.add(peer);
    }
    
    @OnClose
    public void onClose(Session peer){
        peers.remove(peer);
    }
    
    @OnMessage
    public void conectarDados(Objeto object, Session session)  {
        System.out.println("Mensagem WsChat Cuiaba: "+object);        
        for(Session peer:peers){
            if (!peer.equals(session)){  
                try {                
                    peer.getBasicRemote().sendObject(object);
                } catch (IOException ex) {
                    System.out.println("Erro na");
                    Logger.getLogger(CuiabaWS.class.getName()).log(Level.SEVERE, null, ex);
                } catch (EncodeException ex) {
                    Logger.getLogger(CuiabaWS.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }
}
