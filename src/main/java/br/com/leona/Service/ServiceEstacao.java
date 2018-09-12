package br.com.leona.Service;

import br.com.leona.Dao.DaoEstacao;
import br.com.leona.Model.Estacao;
import java.io.Serializable;
import java.util.List;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceEstacao implements Serializable {
    
    DaoEstacao daoEstacao = QueryBuilder.create(DaoEstacao.class);
    
    public Boolean cadastrarEstacao(Estacao estacao){
        daoEstacao.save(estacao);
        return true;
    }

    public List<Estacao> retornarEstacoes() {
        return daoEstacao.list();
    }

    public void excluirEstacao(Long id) {
        daoEstacao.delete(id);  
    }

    public void editarEstacao(Estacao estacao) {
        Estacao listE = daoEstacao.getById(estacao.getId());
        listE.setEmailContato(estacao.getEmailContato());
        listE.setNomeContato(estacao.getNomeContato());
        listE.setTelefoneContato(estacao.getTelefoneContato());
        daoEstacao.save(listE);
    }

    public String retornarStatusEstacao(String nome) {
        if (nome.equals("São José dos Campos")){
            
        }
        return "";
    }
}
