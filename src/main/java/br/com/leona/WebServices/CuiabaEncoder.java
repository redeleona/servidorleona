package br.com.leona.WebServices;

import java.util.Date;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class CuiabaEncoder implements Encoder.Text<Objeto>{
    
    @Override
    public String encode(Objeto object) throws EncodeException {
        return object.getJson().toString();
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("Novo Encoder Cuiabá "+new Date());
    }

    @Override
    public void destroy() {
        System.out.println("Saída de Encoder Cuiabá "+new Date());
    }
    
}
