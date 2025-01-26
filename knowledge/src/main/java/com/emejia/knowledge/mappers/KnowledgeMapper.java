package com.emejia.knowledge.mappers;

import java.util.ArrayList;

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

	
}
