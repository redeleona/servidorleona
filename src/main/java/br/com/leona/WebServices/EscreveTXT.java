package br.com.leona.WebServices;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

public class EscreveTXT {
 
    public static void escritor(String log) throws IOException {
        
        try{
            Date data = new Date();
            BufferedWriter buffWrite = new BufferedWriter(new FileWriter("C:\\Users\\Leona Servidor\\Documents\\Leona SVN\\LEONA Dmz\\teste\\Projeto-Netbeans-Python\\projeto proxy\\logs" + data.toString() +".txt"));      
            buffWrite.append(log + "\n");
            buffWrite.close();
        }
        catch (IOException e){
            System.out.println("Erro ao escrever arquivo: "+e);
        }
    } 
}