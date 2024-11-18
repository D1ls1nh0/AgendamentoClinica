package com.clinica.trabalhoclinica.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.clinica.trabalhoclinica.model.Agendamento;

public interface AgendamentoRepository extends MongoRepository<Agendamento, String> {
    List<Agendamento> findByUsuario(String usuario);

}



