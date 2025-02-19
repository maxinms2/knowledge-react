package com.andres.backend.usersapp.backendusersapp.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.andres.backend.usersapp.backendusersapp.models.entities.Archivo;

public interface IArchivoService {
	List<Archivo> getArchivos(Long know);
	
	Optional<Archivo> getArchivo(Long idArchivo);
	
	Archivo saveArchivo(Long idKnow, Archivo file) throws IOException;
}
