package com.clinica.trabalhoclinica.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinica.trabalhoclinica.model.Agendamento;
import com.clinica.trabalhoclinica.service.AgendamentoService;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoRestController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento) {
        try {
            Agendamento salvo = agendamentoService.salvarAgendamento(agendamento);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarAgendamentos() {
        try {
            List<Agendamento> agendamentos = agendamentoService.listarTodos();
            return ResponseEntity.ok(agendamentos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
