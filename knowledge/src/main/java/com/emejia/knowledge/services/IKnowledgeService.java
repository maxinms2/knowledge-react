package com.emejia.knowledge.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.emejia.knowledge.Exceptions.KnowledgeException;
import com.emejia.knowledge.model.dtos.KnowledgeDTO;
import com.emejia.knowledge.model.utils.PositionTree;
import com.emejia.knowledge.persistence.entities.Knowledge;

public interface IKnowledgeService {
	
	KnowledgeDTO createKnowledge(KnowledgeDTO dto) throws KnowledgeException ;
	
	List<Knowledge> getTree(Long rootId);
	
	void delete(Long rootId);
	
	KnowledgeDTO getKnowledge(PositionTree positionTree);
	
	Knowledge nullObject();
	
	List<KnowledgeDTO>  findByText(String text);
}
