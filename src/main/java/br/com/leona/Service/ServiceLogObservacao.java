package br.com.leona.Service;

import br.com.leona.Dao.DaoChat;
import br.com.leona.Dao.DaoLogObservacao;
import br.com.leona.Model.Chat;
import br.com.leona.Model.LogObservacao;
import java.io.Serializable;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.json.Json;
import javax.json.JsonObject;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceLogObservacao implements Serializable {

    DaoLogObservacao daoLogObs = QueryBuilder.create(DaoLogObservacao.class);
    DaoChat daoChat = QueryBuilder.create(DaoChat.class);
    private LogObservacao log;

    public ServiceLogObservacao() {
        this.log = new LogObservacao();
    }

    public void salvarAcaoObs(String data) {
        try {
            JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

            log.setDataHora(jsonObject.getString("datahora"));
            log.setEmailUsuario(jsonObject.getString("emailusuario"));
            log.setGraus(jsonObject.getString("graus"));
            log.setIdObservacao(jsonObject.getInt("idobservacao"));
            log.setMovimento(jsonObject.getString("movimento"));
            log.setUsuario(jsonObject.getString("usuario"));
            daoLogObs.save(log);
        } catch (Exception e) {
            System.out.println("Erro ao gravar log: " + e);
        }
    }

    public List<LogObservacao> retornarLogObs(int obs) {
        List<LogObservacao> listO = new ArrayList<LogObservacao>();
        try {
            List<LogObservacao> listObs = daoLogObs.list();
            for (LogObservacao log : listObs) {
                int idObs = log.getIdObservacao();
                int idObsVindo = obs;
                if (idObs == idObsVindo) {
                    listO.add(log);
                }
            }
            return listO;
        } catch (Exception ex) {
            List<LogObservacao> list = new ArrayList<LogObservacao>();
            return list;
        }
    }

    public void salvarChat(Chat chat) {
        try {
            daoChat.save(chat);
        } catch (Exception e) {
            System.out.println("Erro ao Gravar Chat: " + e);
        }
    }

    public List<Chat> buscarChat(int parseInt) {
        List<Chat> listC = new ArrayList<Chat>();
        try {
            List<Chat> listObs = daoChat.list();
            for (Chat log : listObs) {
                int idObs = log.getIdobservacao();
                int idObsVindo = parseInt;
                if (idObs == idObsVindo) {
                    listC.add(log);
                }
            }
            return listC;
        } catch (Exception ex) {
            List<Chat> list = new ArrayList<Chat>();
            return list;
        }
    }
}
