package br.com.leona.WebServices;

import br.com.leona.Service.ServiceLogObservacao;
import java.io.IOException;
import java.io.StringReader;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class SaoJoseDecoder implements Decoder.Text<Objeto>{

    private ServiceLogObservacao logObs;
    
    public SaoJoseDecoder(){
        this.logObs = new ServiceLogObservacao();
    }
    
    @Override
    public Objeto decode(String s) throws DecodeException {
        try {
            EscreveTXT.escritor(s);
            System.out.println("Gravando Log ");
        } catch (IOException ex) {
            System.out.println("Erro gravando Log "+ ex);
        }
        logObs.salvarAcaoObs(s);
        JsonObject jsonObject = Json.createReader(new StringReader(s)).readObject();
        return new Objeto(jsonObject);
    }

    @Override
    public boolean willDecode(String s) {
        try{
            Json.createReader(new StringReader(s)).readObject();
            return true;
        }catch(JsonException ex){
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("Inicio Decoder São José dos Campos "+new Date());
    }

    @Override
    public void destroy() {
        System.out.println("Saída Decoder São José dos Campos "+new Date());
    }
    
}
