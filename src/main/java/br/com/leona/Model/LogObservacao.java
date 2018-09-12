package br.com.leona.Model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LogObservacao implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int idobservacao;
    private String emailusuario;
    private String movimento;
    private String graus;    
    private String datahora;
    private String usuario;

    public String getEmailusuario() {
        return emailusuario;
    }

    public void setEmailusuario(String emailusuario) {
        this.emailusuario = emailusuario;
    }

    public String getDatahora() {
        return datahora;
    }

    public void setDatahora(String datahora) {
        this.datahora = datahora;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIdObservacao() {
        return idobservacao;
    }

    public void setIdObservacao(int idObservacao) {
        this.idobservacao = idObservacao;
    }

    public String getEmailUsuario() {
        return emailusuario;
    }

    public void setEmailUsuario(String usuario) {
        this.emailusuario = usuario;
    }

    public String getMovimento() {
        return movimento;
    }

    public void setMovimento(String acao) {
        this.movimento = acao;
    }

    public String getGraus() {
        return graus;
    }

    public void setGraus(String graus) {
        this.graus = graus;
    }

    public String getDataHora() {
        return datahora;
    }

    public void setDataHora(String dataHora) {
        this.datahora = dataHora;
    }
}
