package com.emejia.knowledge.mappers;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.emejia.knowledge.model.dtos.KnowledgeDTO;
import com.emejia.knowledge.persistence.entities.Knowledge;

@Component
public class KnowledgeMapper {


	public KnowledgeDTO entityToDTO(Knowledge db) {
		KnowledgeDTO dto = new KnowledgeDTO();
		dto.setId(db.getId());
		dto.setContent(db.getContent());
		dto.setParentId(db.getParent().getId());
		dto.setTitle(db.getTitle());
		dto.setChildren(new ArrayList<>());
		dto.setCreatedAt(db.getCreatedAt());
		dto.setUpdatedAt(db.getUpdatedAt());
		return dto;
	}
	
	public Knowledge dtoToEntity(KnowledgeDTO dto) {
		Knowledge db=new Knowledge();
		db.setContent(dto.getContent());
		db.setTitle(dto.getTitle());
		db.setCreatedAt(new Date());
		db.setUpdatedAt(new Date());
		return db;
	}

	
}
