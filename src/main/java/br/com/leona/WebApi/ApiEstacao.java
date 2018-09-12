package br.com.leona.WebApi;

import br.com.leona.Model.Estacao;
import br.com.leona.Service.ServiceEstacao;
import br.com.leona.Validation.ValidationEstacao;
import com.google.gson.Gson;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/estacao")
public class ApiEstacao {

    Gson gs = new Gson();
    private ValidationEstacao validationEstacao;
    private ServiceEstacao serviceEstacao;

    public ApiEstacao() {
        this.validationEstacao = new ValidationEstacao();
        this.serviceEstacao = new ServiceEstacao();
    }

    @POST
    @Path("/cadastrarEstacao")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarEstacao(String data) {
        Estacao estacao = gs.fromJson(data, Estacao.class);
        String valida = validationEstacao.validarCadastroEstacao(estacao);
        if (!valida.equals("")) {
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"" + valida + "\"}").build();
        } else {
            serviceEstacao.cadastrarEstacao(estacao);
            return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
        }
    }

    @GET
    @Path("/retornarEstacoes")
    public Response retornarEstacoes() {
        List<Estacao> listEstacoes = serviceEstacao.retornarEstacoes();
        String lista = gs.toJson(listEstacoes);
        return Response.status(201).entity(lista).build();
    }
    
    @GET
    @Path("/statusEstacao/{nome}")
    public Response statusEstacao(@PathParam("nome") String nome) {
        String resposta = serviceEstacao.retornarStatusEstacao(nome);        
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\""+resposta+"\"}").build();
    }
    
    @POST
    @Path("/excluirEstacao")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response excluirEstacao(String data){
        Estacao estacao = gs.fromJson(data, Estacao.class);
        serviceEstacao.excluirEstacao(estacao.getId());
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
    }
    
    @POST
    @Path("/editarEstacao")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editarEstacao(String data){
        Estacao estacao = gs.fromJson(data, Estacao.class);
        String valida = validationEstacao.validarEdicaoEstacao(estacao.getNomeContato());
        if (!valida.equals("")) {
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"" + valida + "\"}").build();
        } else {
            serviceEstacao.editarEstacao(estacao);
            return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();
        }
    }
}
