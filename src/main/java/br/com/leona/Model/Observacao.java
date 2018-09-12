package br.com.leona.Model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.eclipse.persistence.jpa.jpql.parser.DateTime;

@Entity
public class Observacao implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String estacao;
    private String diaInicio;
    private String mesInicio;
    private String anoInicio;
    private String horaInicio;
    private String minInicio;
    private String diaFim;
    private String mesFim;
    private String anoFim;
    private String horaFim;
    private String minFim;
    private String usuarioCriador;
    private Boolean primeiroUsuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstacao() {
        return estacao;
    }

    public void setEstacao(String estacao) {
        this.estacao = estacao;
    }

    public String getDiaInicio() {
        return diaInicio;
    }

    public void setDiaInicio(String diaInicio) {
        this.diaInicio = diaInicio;
    }

    public String getMesInicio() {
        return mesInicio;
    }

    public void setMesInicio(String mesInicio) {
        this.mesInicio = mesInicio;
    }

    public String getAnoInicio() {
        return anoInicio;
    }

    public void setAnoInicio(String anoInicio) {
        this.anoInicio = anoInicio;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getMinInicio() {
        return minInicio;
    }

    public void setMinInicio(String minInicio) {
        this.minInicio = minInicio;
    }

    public String getDiaFim() {
        return diaFim;
    }

    public void setDiaFim(String diaFim) {
        this.diaFim = diaFim;
    }

    public String getMesFim() {
        return mesFim;
    }

    public void setMesFim(String mesFim) {
        this.mesFim = mesFim;
    }

    public String getAnoFim() {
        return anoFim;
    }

    public void setAnoFim(String anoFim) {
        this.anoFim = anoFim;
    }

    public String getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(String horaFim) {
        this.horaFim = horaFim;
    }

    public String getMinFim() {
        return minFim;
    }

    public void setMinFim(String minFim) {
        this.minFim = minFim;
    }

    public String getUsuarioCriador() {
        return usuarioCriador;
    }

    public void setUsuarioCriador(String usuarioCriador) {
        this.usuarioCriador = usuarioCriador;
    }

    public Boolean getPrimeiroUsuario() {
        return primeiroUsuario;
    }

    public void setPrimeiroUsuario(Boolean primeiroUsuario) {
        this.primeiroUsuario = primeiroUsuario;
    }
    
    
}
