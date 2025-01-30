package com.emejia.knowledge.persistence.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.emejia.knowledge.persistence.entities.User;


public interface UserRepository extends JpaRepository<User, Integer>{
	
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
