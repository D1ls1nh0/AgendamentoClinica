package com.clinica.trabalhoclinica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.trabalhoclinica.model.Agendamento;
import com.clinica.trabalhoclinica.repository.AgendamentoRepository;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento salvarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }
}
