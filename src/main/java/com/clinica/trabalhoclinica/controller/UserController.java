package com.clinica.trabalhoclinica.controller;

import com.clinica.trabalhoclinica.model.User;
import com.clinica.trabalhoclinica.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
