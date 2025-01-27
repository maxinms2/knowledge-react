package com.emejia.knowledge.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.emejia.knowledge.persistence.entities.Knowledge;

import jakarta.transaction.Transactional;

public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
    List<Knowledge> findByParentId(Long parentId); // Para obtener hijos directos
    
//    @Transactional
//    @Modifying
//    @Query("DELETE FROM User u WHERE u.status = :status")
//    void deleteByParent(Long parent);
}
