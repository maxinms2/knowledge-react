package com.andres.backend.usersapp.backendusersapp.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.andres.backend.usersapp.backendusersapp.models.entities.Archivo;
import com.andres.backend.usersapp.backendusersapp.services.IArchivoService;

@RestController
@RequestMapping("/archivos")
public class ArchivoController {
	@Autowired
	private IArchivoService service;
	
	
	// 📌 Cargar archivo
    @PostMapping("/subir/{idKnow}")
    public ResponseEntity<String> subirExpediente(@PathVariable Long idKnow, @RequestBody Archivo file) {
        try {
        	service.saveArchivo(idKnow, file);
            return ResponseEntity.ok("Archivo subido exitosamente");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
        }
    }

    // 📌 Obtener lista de archivos de un ciudadano
    @GetMapping("/knowledge/{idKnow}")
    public ResponseEntity<List<Archivo>> obtenerExpedientes(@PathVariable Long idKnow) {
        List<Archivo> expedientes = service.getArchivos(idKnow);
        return ResponseEntity.ok(expedientes);
    }

    // 📌 Descargar archivo por ID
    @GetMapping("/descargar/{idknow}")
    public ResponseEntity<Archivo> descargarExpediente(@PathVariable Long idknow) {
        Optional<Archivo> archivo = service.getArchivo(idknow);
        if (archivo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(archivo.get());
    }

}
