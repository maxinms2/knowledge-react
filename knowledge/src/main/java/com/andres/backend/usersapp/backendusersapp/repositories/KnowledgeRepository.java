package com.andres.backend.usersapp.backendusersapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.andres.backend.usersapp.backendusersapp.models.entities.Knowledge;

import jakarta.transaction.Transactional;

public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
    List<Knowledge> findByParentId(Long parentId); // Para obtener hijos directos
    
    @Query("select k FROM Knowledge k WHERE LOWER(k.title)"
    + " LIKE LOWER(CONCAT('%', :text, '%')) OR LOWER(k.content) LIKE LOWER(CONCAT('%', :text, '%'))")
    List<Knowledge>  findByText(String text);
    
    @Query("select k FROM Knowledge k WHERE LOWER(k.title) = LOWER(:title)")
    Knowledge  findByTitle(String title);
    
    
}
