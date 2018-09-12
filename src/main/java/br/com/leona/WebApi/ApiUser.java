package br.com.leona.WebApi;

import br.com.leona.Model.Usuario;
import br.com.leona.Service.ServiceUser;
import br.com.leona.Validation.ValidationUsuario;
import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

@Path("/usuario2")
public class ApiUser {
    
    private ValidationUsuario validationUsuario;
    private ServiceUser serviceUsuario;
    Gson gs = new Gson(); 
    
    public ApiUser(){
        this.validationUsuario = new ValidationUsuario();    
        this.serviceUsuario = new ServiceUser();
    }
    
    @POST
    @Path("/editarSenha")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editarSenha(String data){
        Usuario login = gs.fromJson(data,Usuario.class);
        serviceUsuario.editarSenha(login);
        return Response.status(201).entity("{\"status\":\"1\"}").build(); 
    }
    
    @POST
    @Path("/logarUsuario")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response logarUsuario(String data){     
        Usuario login = gs.fromJson(data,Usuario.class);
        String validaLogin = validationUsuario.validarLoginUsuario(login);
        if (!validaLogin.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+validaLogin+"\"}").build(); 
        }else{
            Usuario usuario = serviceUsuario.logarUsuario(login);
            JSONObject objUsuario = new JSONObject(usuario);
            objUsuario.remove("senha");
            String userString = gs.toJson(objUsuario);
            if (usuario==null){
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"E-mail/Senha não encontrados\"}").build(); 
            }else{                
                return Response.status(201).entity(userString).build(); 
            }
        }
    }
    
    @POST
    @Path("/cadastrarUsuario")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarUsuario(String data){            
        Usuario usuario = gs.fromJson(data,Usuario.class);
        String respostaValidation = validationUsuario.validarCadastroUsuario(usuario);
        if (!respostaValidation.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+respostaValidation+"\"}").build(); 
        }else{
            if (serviceUsuario.buscarUsuarioEmail(usuario.getEmail())!=null){
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"E-mail já está cadastrado\"}").build(); 
            }else{
                serviceUsuario.cadastrarUsuario(usuario);
                return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build(); 
            }            
        }        
    }
    
    @GET
    @Path("/buscarUsuarios")
     @Consumes(MediaType.APPLICATION_JSON)
    public Response buscarUsuarios(){
        List<Usuario> listUsuarios = serviceUsuario.buscarUsuarios();          
        String listU = gs.toJson(listUsuarios);
        return Response.status(201).entity(listU).build(); 
    }
    
    @GET
    @Path("/retornarNomeFoto")
     @Consumes(MediaType.APPLICATION_JSON)
    public Response retornarNomeFoto(){
        String ret = serviceUsuario.retornarNomeFoto();
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\""+ret+"\"}").build(); 
    }
    
    @GET
    @Path("/mudarStatusUsuario/{email}")
    public Response mudarStatusUsuario(@PathParam("email") String email){
        if (!validationUsuario.validarEmail(email)){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"E-mail inválido\"}").build(); 
        }else{
            serviceUsuario.mudarStatusUsuario(email);
            return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build(); 
        }        
    }
    
    @POST
    @Path("/editarMeusDados")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editarMeusDados(String data){
        Usuario usuario = gs.fromJson(data,Usuario.class);
        String valida = validationUsuario.validarEdicaoUsuario(usuario);
        if (!valida.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+valida+"\"}").build();     
        }else{
            Usuario user = serviceUsuario.editarDadosUsuario(usuario);
            JSONObject objUsuario = new JSONObject(user);
            objUsuario.remove("senha");
            String userString = gs.toJson(objUsuario);
            return Response.status(201).entity(userString).build(); 
        }        
    }
    
    @GET
    @Path("/recuperarSenha/{email}")
    public Response recuperarSenha(@PathParam("email") String email){
        if (!validationUsuario.validarEmail(email)){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"Digite seu e-mail\"}").build(); 
        }else{
            String resultado = serviceUsuario.recuperarSenha(email);
            return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\""+resultado+"\"}").build();
            
        }        
    }
}
