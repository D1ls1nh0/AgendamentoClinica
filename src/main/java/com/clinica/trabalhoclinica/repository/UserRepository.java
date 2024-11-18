package com.clinica.trabalhoclinica.repository;

import com.clinica.trabalhoclinica.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
