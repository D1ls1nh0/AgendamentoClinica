package com.clinica.trabalhoclinica.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.clinica.trabalhoclinica.model.Agendamento;
import com.clinica.trabalhoclinica.repository.AgendamentoRepository;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public Agendamento salvarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamento> buscarAgendamentosPorUsuario(String username) {
        return agendamentoRepository.findByUsuario(username);
    }
}


