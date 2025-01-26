package com.emejia.knowledge.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emejia.knowledge.persistence.entities.Knowledge;

public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
    List<Knowledge> findByParentId(Long parentId); // Para obtener hijos directos
}
