package com.emejia.knowledge.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emejia.knowledge.Exceptions.KnowledgeException;
import com.emejia.knowledge.persistence.entities.User;
import com.emejia.knowledge.services.IUserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(originPatterns = "*")
public class UserController {

	private final IUserService service;

	public UserController(IUserService service) {
		this.service = service;
	}
	
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody User user) {
		try {
			return ResponseEntity.ok(service.save(user));
		} catch (KnowledgeException ex) {
			// Respuesta personalizada para la excepción
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(Map.of("error", ex.getMessage(), "errorCode", ex.getErrorCode()));
		} catch (Exception ex) {
			// Manejo de errores generales
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Error inesperado", "message", ex.getMessage()));
		}
	}
	
	

	

	@PostMapping("/find")
	public ResponseEntity<?> find(@RequestBody User user) throws KnowledgeException {
		
		try {
			return ResponseEntity.ok(service.findUser(user.getEmail()));
		} catch (KnowledgeException ex) {
			// Respuesta personalizada para la excepción
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(Map.of("error", ex.getMessage(), "errorCode", ex.getErrorCode()));
		} catch (Exception ex) {
			// Manejo de errores generales
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Error inesperado", "message", ex.getMessage()));
		}

	}
	
	@DeleteMapping
	public void delete(@RequestBody User user) {
		service.deleteUser(user);
	}

}
