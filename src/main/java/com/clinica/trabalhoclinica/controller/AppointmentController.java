package com.clinica.trabalhoclinica.controller;

import com.clinica.trabalhoclinica.model.Appointment;
import com.clinica.trabalhoclinica.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/available")
    public List<Appointment> getAvailableAppointments(@RequestParam String specialty) {
        return appointmentService.findAvailableAppointments(specialty);
    }

    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    
}

