package com.andres.backend.usersapp.backendusersapp.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.andres.backend.usersapp.backendusersapp.exceptions.KnowledgeException;
import com.andres.backend.usersapp.backendusersapp.models.dto.KnowledgeDTO;
import com.andres.backend.usersapp.backendusersapp.models.entities.Knowledge;
import com.andres.backend.usersapp.backendusersapp.models.utils.PositionTree;

public interface IKnowledgeService {
	
	KnowledgeDTO createKnowledge(KnowledgeDTO dto) throws KnowledgeException ;
	
	List<Knowledge> getTree(Long rootId);
	
	void delete(Long rootId);
	
	KnowledgeDTO getKnowledge(PositionTree positionTree);
	
	Knowledge nullObject();
	
	Long restore(List<KnowledgeDTO> respaldo);
	
	List<KnowledgeDTO>  findByText(String text);
}

