package com.andres.backend.usersapp.backendusersapp.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andres.backend.usersapp.backendusersapp.exceptions.KnowledgeException;
import com.andres.backend.usersapp.backendusersapp.models.dto.KnowledgeDTO;
import com.andres.backend.usersapp.backendusersapp.models.dto.mapper.KnowledgeMapper;
import com.andres.backend.usersapp.backendusersapp.models.utils.PositionTree;
import com.andres.backend.usersapp.backendusersapp.services.IKnowledgeService;


@RestController
@RequestMapping("/knowledge")
@CrossOrigin(origins = "*")
public class KnowledgeController {
	private final IKnowledgeService service;
	private final KnowledgeMapper mapper;

	public KnowledgeController(IKnowledgeService service, KnowledgeMapper mapper) {
		this.service = service;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody KnowledgeDTO dto){
	       try {
	    	   return ResponseEntity.ok(service.createKnowledge(dto));
	        } catch (KnowledgeException ex) {
	            // Respuesta personalizada para la excepción
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
	                "error", ex.getMessage(),
	                "errorCode", ex.getErrorCode()
	            ));
	        } catch (Exception ex) {
	            // Manejo de errores generales
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
	                "error", "Error inesperado",
	                "message", ex.getMessage()
	            ));
	        }
	}
	
	@PostMapping("/children")
	public ResponseEntity<KnowledgeDTO> getChildren(@RequestBody PositionTree positionTree) {
		KnowledgeDTO knowledge=service.getKnowledge(positionTree);
		return ResponseEntity.ok(knowledge);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Long id) {
		service.delete(id);
	}
	
	@PostMapping("/find")
	public ResponseEntity<List<KnowledgeDTO>> findText(@RequestBody KnowledgeDTO dto) {
		List<KnowledgeDTO> knowledges= service.findByText(dto.getContent());
		return ResponseEntity.ok(knowledges);
	}
	
	@PostMapping("/restore")
	public ResponseEntity<String> restore(@RequestBody List<KnowledgeDTO> respaldo) {
		return ResponseEntity.ok("Guardados "+service.restore(respaldo) + "de"+ respaldo.size());
	}
	
	
}
