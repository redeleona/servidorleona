package br.com.leona.Service;

import br.com.leona.Dao.DaoObservacao;
import br.com.leona.Model.Observacao;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceObservacao implements Serializable {

    DaoObservacao obsDao = QueryBuilder.create(DaoObservacao.class);

    public Boolean cadastrarObservacao(Observacao obs) {
        obs.setPrimeiroUsuario(Boolean.FALSE);
        obsDao.save(obs);
        return true;

    }

    public List<Observacao> retornarObservacoes() {
        return obsDao.list();
    }
}
