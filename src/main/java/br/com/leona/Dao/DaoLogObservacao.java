package br.com.leona.Dao;

import br.com.leona.Model.LogObservacao;
import java.util.List;
import org.esfinge.querybuilder.Repository;

public interface DaoLogObservacao extends Repository<LogObservacao>{
    
    List<LogObservacao> getLogObservacaoByIdobservacao(int id);
    
}
