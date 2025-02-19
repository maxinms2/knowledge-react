package com.andres.backend.usersapp.backendusersapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.andres.backend.usersapp.backendusersapp.models.entities.Archivo;

public interface ArchivoRepository extends JpaRepository<Archivo,Long> {
	
	@Query("select a from Archivo a where a.knowledge.id = :know ")
	List<Archivo> findByKnowledge(Long know); 
}
