package com.clinica.trabalhoclinica;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index"; // Nome do arquivo HTML para a página inicial (index.html)
    }

    @GetMapping("/login")
    public String login() {
        return "login-register"; // Nome do arquivo HTML para a página de login (login-register.html)
    }
}
