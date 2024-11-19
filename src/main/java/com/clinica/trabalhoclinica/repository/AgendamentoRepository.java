package com.clinica.trabalhoclinica.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.clinica.trabalhoclinica.model.Agendamento;

public interface AgendamentoRepository extends MongoRepository<Agendamento, String> {
    // Sem métodos específicos agora
}
