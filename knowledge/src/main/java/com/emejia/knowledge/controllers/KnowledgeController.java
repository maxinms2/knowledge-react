package com.emejia.knowledge.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emejia.knowledge.mappers.KnowledgeMapper;
import com.emejia.knowledge.model.dtos.KnowledgeDTO;
import com.emejia.knowledge.model.utils.PositionTree;
import com.emejia.knowledge.services.IKnowledgeService;

@RestController
@RequestMapping("/api/knowledge")
@CrossOrigin(origins = "*")
public class KnowledgeController {
	private final IKnowledgeService service;
	private final KnowledgeMapper mapper;

	public KnowledgeController(IKnowledgeService service, KnowledgeMapper mapper) {
		this.service = service;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<KnowledgeDTO> create(@RequestBody KnowledgeDTO dto) {
		return ResponseEntity.ok(service.createKnowledge(dto));
	}
	
	@PostMapping("/children")
	public ResponseEntity<KnowledgeDTO> getChildren(@RequestBody PositionTree positionTree) {
		KnowledgeDTO knowledge=service.getKnowledge(positionTree);
		return ResponseEntity.ok(knowledge);
	}
}
