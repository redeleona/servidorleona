package br.com.leona.Validation;

import br.com.leona.Model.Estacao;

public class ValidationEstacao {
    
    public String validarCadastroEstacao(Estacao estacao){
        if (estacao.getCidade().isEmpty()){
            return "Cidade é obrigatório";
        }else{
            if ((estacao.getEstado().isEmpty())||(estacao.getPais().isEmpty())||(estacao.getLatitude().isEmpty())||(estacao.getLongitude().isEmpty())){
                return "Há campos vázios! Digite a cidade novamente";
            }else{
                return "";
            }
        }
    }

    public String validarEdicaoEstacao(String nomeContato) {
        if ("".equals(nomeContato)){
                return "Nome do contato é obrigatório";
            }else{
                return "";
            }
    }
    
}
