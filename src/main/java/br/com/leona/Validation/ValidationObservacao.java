package br.com.leona.Validation;

import br.com.leona.Model.Observacao;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ValidationObservacao {

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

    public String validarCadastroObservacao(Observacao obs) {
        if (obs.getEstacao().isEmpty()) {
            return "Selecione a estação corretamente";
        } else {
            if ((obs.getDiaInicio().isEmpty()) || (obs.getMesInicio().isEmpty()) || (obs.getAnoInicio().isEmpty()) || (obs.getHoraInicio().isEmpty()) || (obs.getMinInicio().isEmpty())) {
                return "Selecione data hora de início corretamente";
            } else {
                if ((obs.getDiaFim().isEmpty()) || (obs.getMesFim().isEmpty()) || (obs.getAnoFim().isEmpty()) || (obs.getHoraFim().isEmpty()) || (obs.getMinFim().isEmpty())) {
                    return "Selecione data hora de fim corretamente";
                } else {
                    if (!validarData(obs.getDiaInicio(), obs.getMesInicio(), obs.getAnoInicio(),obs.getHoraInicio(),obs.getMinInicio())) {
                        return "Data de início inválida";
                    } else {
                        if (!validarData(obs.getDiaFim(), obs.getMesFim(), obs.getAnoFim(),obs.getHoraFim(),obs.getMinFim())) {
                            return "Data de fim inválida";
                        } else {
                            if (!compararDatas(obs.getDiaInicio(), obs.getMesInicio(), obs.getAnoInicio(), obs.getDiaFim(), obs.getMesFim(), obs.getAnoFim(), obs.getHoraInicio(), obs.getMinInicio(), obs.getHoraFim(), obs.getMinFim())) {
                                return "Data de inicio deve ser antes de fim";
                            } else {
                                return "";
                            }
                        }
                    }
                }
            }
        }
    }
        
//        public String validarCadastroObservacao(Observacao obs) {
//        if (obs.getEstacao().isEmpty()) {
//            return "Selecione a estação corretamente";
//        } else {
//            if ((obs.getDiaInicio().isEmpty()) || (obs.getMesInicio().isEmpty()) || (obs.getAnoInicio().isEmpty()) || (obs.getHoraInicio().isEmpty()) || (obs.getMinInicio().isEmpty())) {
//                return "Selecione data hora de início corretamente";
//            } else {
//                if ((obs.getDiaFim().isEmpty()) || (obs.getMesFim().isEmpty()) || (obs.getAnoFim().isEmpty()) || (obs.getHoraFim().isEmpty()) || (obs.getMinFim().isEmpty())) {
//                    return "Selecione data hora de fim corretamente";
//                } else {
//                    //Verifica se já existe observação no mesmo período
//                    if((obs.getDiaFim().isEmpty())){
//                        return "Já existe observação para o período selecionado. Por favor, verifique em Observações Futuras";
//                    }else{                                        
//                        if (!validarData(obs.getDiaInicio(), obs.getMesInicio(), obs.getAnoInicio(),obs.getHoraInicio(),obs.getMinInicio())) {
//                            return "Data de início inválida";
//                        } else {
//                            if (!validarData(obs.getDiaFim(), obs.getMesFim(), obs.getAnoFim(),obs.getHoraFim(),obs.getMinFim())) {
//                                return "Data de fim inválida";
//                            } else {
//                                if (!compararDatas(obs.getDiaInicio(), obs.getMesInicio(), obs.getAnoInicio(), obs.getDiaFim(), obs.getMesFim(), obs.getAnoFim(), obs.getHoraInicio(), obs.getMinInicio(), obs.getHoraFim(), obs.getMinFim())) {
//                                    return "Data de inicio deve ser antes de fim";
//                                } else {
//                                    return "";
//                                }
//                            }
//                        }                
//                    }
//                }
//            }
//        }
//    }
    
    private Boolean validarData(String dia, String mes, String ano, String hora, String min) {

        try {
            Date data = sdf.parse(dia + "/" + mes + "/" + ano);
            Date hoje = new Date();
            data.setHours(Integer.parseInt(hora));
            data.setMinutes(Integer.parseInt(min));
            if (hoje.before(data)){
                return true;    
            }else{
                return false;
            }            
        } catch (Exception e) {
            return false;
        }
    }

    private Boolean compararDatas(String diaI, String mesI, String anoI, String diaF, String mesF, String anoF, String horaI, String minI, String horaF, String minF) {
        try {
            Date inicio = sdf.parse(diaI + "/" + mesI + "/" + anoI);
            Date fim = sdf.parse(diaF + "/" + mesF + "/" + anoF);
            Date hoje = new Date();
                       
            if (inicio.before(fim)) {
                return true;
            } else {
                if (inicio.equals(fim)) {
                    if (Integer.parseInt(horaI) < Integer.parseInt(horaF)) { //Se a hora Inicial é menor que a hora final
                        return true;
                    } else {
                        if (Integer.parseInt(horaI) > Integer.parseInt(horaF)) { //Se a hora inicial é maior que a hora final
                            return false;
                        } else {
                            if (Integer.parseInt(minI) < Integer.parseInt(minF)) { //Se as horas forem iguais valido o minuto inicial ser menor que o final
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            }
        } catch (Exception e) {
            return false;
        }
    }
}
