package com.clinica.trabalhoclinica.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.clinica.trabalhoclinica.model.Agendamento;
import com.clinica.trabalhoclinica.service.AgendamentoService;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento) {
        Agendamento salvo = agendamentoService.salvarAgendamento(agendamento);
        return ResponseEntity.ok(salvo);
    }

    // Mapeando a URL corretamente para listar os agendamentos
    @GetMapping
    public String listarAgendamentos(Model model, Principal principal) {
        String username = principal.getName();
        List<Agendamento> agendamentos = agendamentoService.buscarAgendamentosPorUsuario(username);
        model.addAttribute("agendamentos", agendamentos);
        return "meus-agendamentos"; // Nome do arquivo HTML
    }
}
