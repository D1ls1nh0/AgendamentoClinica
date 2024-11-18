package com.clinica.trabalhoclinica.service;

import com.clinica.trabalhoclinica.model.User;
import com.clinica.trabalhoclinica.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
