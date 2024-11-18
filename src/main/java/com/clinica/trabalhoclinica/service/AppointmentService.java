package com.clinica.trabalhoclinica.service;

import com.clinica.trabalhoclinica.model.Appointment;
import com.clinica.trabalhoclinica.model.User;
import com.clinica.trabalhoclinica.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<Appointment> findAvailableAppointments(String specialty) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAvailableAppointments'");
    }

    public Appointment bookAppointment(Appointment appointment) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'bookAppointment'");
    }
}
