package br.com.leona.WebApi;

import br.com.leona.Model.Chat;
import br.com.leona.Model.LogObservacao;
import br.com.leona.Model.Observacao;
import br.com.leona.Service.ServiceLogObservacao;
import br.com.leona.Service.ServiceObservacao;
import br.com.leona.Validation.ValidationObservacao;
import com.google.gson.Gson;
import java.io.StringReader;
import java.util.List;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/observacao2")
public class ApiObs {

    Gson gs = new Gson();
    ValidationObservacao validationObs;
    ServiceObservacao serviceObs;
    ServiceLogObservacao serviceLogObs;

    public ApiObs() {
        this.validationObs = new ValidationObservacao();
        this.serviceObs = new ServiceObservacao();
        this.serviceLogObs = new ServiceLogObservacao();
    }

    @POST
    @Path("/cadastrarObservacao")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarObservacao(String data) {
        Observacao obs = gs.fromJson(data, Observacao.class);
        String verifica = validationObs.validarCadastroObservacao(obs);
        if (!verifica.equals("")) {
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"" + verifica + "\"}").build();
        } else {
            if (!serviceObs.cadastrarObservacao(obs)) {
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"Erro! Tente novamente mais tarde\"}").build();
            } else {
                return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
            }
        }
    }

    @GET
    @Path("/retornarObservacoesRealizadas")
    public Response retornarObservacoesRealizadas() {
        List<Observacao> listO = serviceObs.retornarObservacoes();
        String lista = gs.toJson(listO);
        return Response.status(201).entity(lista).build();
    }

    @GET
    @Path("/retornarObservacoesAndamento")
    public Response retornarObservacoesAndamento() {
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
    }

    @GET
    @Path("/retornarObservacoesFuturas")
    public Response retornarObservacoesFuturas() {
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
    }

    @GET
    @Path("/buscarLogsSalvos/{id}")
    public Response buscarLogsSalvos(@PathParam("id") String id) {
        List<LogObservacao> logObs = serviceLogObs.retornarLogObs(Integer.parseInt(id));
        String lista = gs.toJson(logObs);
        return Response.status(201).entity(lista).build();
    }

    @GET
    @Path("/buscarChatSalvo/{id}")
    public Response buscarChatSalvo(@PathParam("id") String id) {
        //montar chat!
        List<Chat> logObs = serviceLogObs.buscarChat(Integer.parseInt(id));
        String lista = gs.toJson(logObs);
        return Response.status(201).entity(lista).build();
    }

    @POST
    @Path("/enviarMensagemChat")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response enviarMensagemChat(String data) {
        JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

            if (jsonObject.getString("log").equals("False")) {
                Chat chat = gs.fromJson(data, Chat.class);
                serviceLogObs.salvarChat(chat);
            } else {
                serviceLogObs.salvarAcaoObs(data);
            }

        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
    }
}
