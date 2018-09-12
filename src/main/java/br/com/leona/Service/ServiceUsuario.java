package br.com.leona.Service;

import br.com.leona.Dao.DaoUsuario;
import br.com.leona.Model.Usuario;
import java.io.Serializable;
import java.util.List;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.esfinge.querybuilder.QueryBuilder;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.mail.*;

public class ServiceUsuario implements Serializable {

    DaoUsuario daoUsuario = QueryBuilder.create(DaoUsuario.class);
    private static String nomeFoto = "";

    public Boolean cadastrarUsuario(Usuario usuario) {
        usuario.setStatus("Inativo");
        usuario.setTipo("Comum");
        usuario.setSenha(usuario.getSenha()); //criptrografar
        daoUsuario.save(usuario);
        return true;
    }

    public Usuario buscarUsuarioEmail(String email) {
        List<Usuario> listUsuario = daoUsuario.getUsuarioByEmail(email);
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }

    }

    public Usuario logarUsuario(Usuario login) {
        ativarFTP();
        List<Usuario> listUsuario = daoUsuario.getUsuarioByEmailAndSenha(login.getEmail(), login.getSenha());
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }
    }
    public static void ativarFTP(){
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                try {
                    executarRealcada();
                } catch (IOException ex) {
                    System.out.println("Excecao em executar: "+ex);
                }
            }
        };
        Timer t = new Timer();
        t.schedule(task, 1, 3600000);//executa a task passada como argumento 1 ms após iniciar a cada 1h;
    }
        
    public static void executarRealcada() throws IOException{
        System.out.println("Executou real: "+new Date());
        FTPClient f = new FTPClient();
        f.connect("server-ftpdsa.cptec.inpe.br"); //url PADRAO do FTP
        f.login("fsabbas", "DSAthEn4cru"); // login e senha do FTP
        FTPFile[] files = f.listFiles("/GOES13/realcada"); // subpastas da URL do FTP
        System.out.println("Pegou arquivos real: " + files.length);
        Calendar cal = GregorianCalendar.getInstance();
        String mes = "" + cal.get(Calendar.MONTH) + 1;
        if (mes.length() == 1) {
            mes = "0" + mes;
        }
        String dia = "" + cal.get(Calendar.DAY_OF_MONTH);
        if (dia.length() == 1) {
            dia = "0" + dia;
        }
        String data = "" + cal.get(Calendar.YEAR) + mes + dia;
        //String data = "20170125";
        System.out.println("Data de hoje: " + data);
        for (int i = files.length - 1; i > 0; i--) {
            String pathLocal = "C:/CPTEC/realcada/";  //Pasta onde vai ficar armazenado os dados         
            String stringUrl = "ftp://fsabbas:DSAthEn4cru@server-ftpdsa.cptec.inpe.br/GOES13/realcada/" + files[i].getName(); //endereço completo da URL dos arquivos
            URL url = new URL(stringUrl);
            String nomeArquivoLocal = url.getFile();
            if (i == files.length - 1){
                nomeFoto = nomeArquivoLocal;    
            }            
        }
    }
    
    public List<Usuario> buscarUsuarios() {
        return daoUsuario.list();
    }

    public String retornarNomeFoto(){
        return nomeFoto;
    }
    
    public Boolean mudarStatusUsuario(String email) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(email);
        if (listUser.isEmpty()) {
            return false;
        } else {
            Usuario user = listUser.get(0);
            if (user.getStatus().equals("Ativo")) {
                user.setStatus("Inativo");
            } else {
                user.setStatus("Ativo");
            }
            daoUsuario.save(user);
            return true;
        }
    }

    public Usuario editarDadosUsuario(Usuario usuario) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(usuario.getEmail());
        Usuario user = listUser.get(0);
        user.setCidade(usuario.getCidade());
        user.setInstituicao(usuario.getInstituicao());
        user.setNome(usuario.getNome());
        user.setSobrenome(usuario.getSobrenome());
        user.setPais(usuario.getPais());
        return daoUsuario.save(user);
    }

    public String recuperarSenha(String email) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(email);
        if (listUser.isEmpty()) {
            return "E-mail não encontrado";
        } else {
            Usuario user = listUser.get(0);
            if (enviarEmail(user.getEmail(), "recuperarsenha", user.getNome(), user.getSenha())){
                return "Senha enviada para o  e-mail informado.";    
            }else{
                return "Erro ao enviar senha! Entre em contato pelo e-mail redeleona@gmail.com";
            }
            
        }
    }

    private Boolean enviarEmail(String destinatario, String tipoEmail, String nome, String senha)
    { 
        String username = "redeleona@gmail.com";
        String password = "leona123";
        String titulo = "";
        String mensagem = "";
        
        if ("recuperarsenha".equals(tipoEmail)){
            titulo = "Recuperação de senha - Rede LEONA";
            mensagem = "Caro(a) Sr(a). "+nome+", \n\n Sua senha de acesso ao Portal de Observação da Rede LEONA é: "+senha+"\n\n Atenciosamente, "
                    + "\nEquipe LEONA.\n\n Dúvidas? Entre em contato conosco pelo número: +55(012)3208-7638 ou pelo e-mail: redeleona@gmail.com."
                    +"\n\n*******Esta mensagem é automática, por favor, não a responda.*******";
        }
    
        Properties props = new Properties();
        /**
         * Parâmetros de conexão com servidor Gmail
         */
        props.put("mail.smtp.host", "smtp.googlemail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {                    
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("redeleona@gmail.com", ".745@n03L");//Colocar senha
                    }
               });

        /**
         * Ativa Debug para sessão
         */
        session.setDebug(true);
       try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("redeleona@gmail.com"));

            Address[] toUser = InternetAddress
                    .parse(destinatario);

            message.setRecipients(Message.RecipientType.TO, toUser);
            message.setSubject(titulo);
            message.setText(mensagem);
            /**
             * Método para enviar a mensagem criada
             */
            Transport.send(message);

            return true;

        } catch (MessagingException e) {
            System.out.println("Erro ao enviar email: "+e+" | Email: "+destinatario);
            return false;
        }
    }
        
   public Boolean editarSenha(Usuario usuario) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(usuario.getEmail());
        Usuario user = listUser.get(0);
        user.setSenha(usuario.getSenha());
        daoUsuario.save(user);
        return true;
    }
}