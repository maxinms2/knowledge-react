package com.emejia.knowledge.persistence.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.emejia.knowledge.persistence.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
	Optional<Role> findByName(String name);
}
