package com.clinica.trabalhoclinica;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "index"; // Nome do arquivo HTML para a página inicial (index.html)
    }

    @GetMapping("/login")
    public String login() {
        return "login-register"; // (login-register.html)
    }

    @GetMapping("/agendamento")
    public String agendamento() {
        return "agendarConsulta"; // (agendarConsulta.html)
    }
    
    @GetMapping("/agenda")
    public String agenda() {
        return "meusAgendamentos"; // (meusAgendamentos.html)
    }
    
}
