package com.andres.backend.usersapp.backendusersapp.services;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.andres.backend.usersapp.backendusersapp.exceptions.KnowledgeException;
import com.andres.backend.usersapp.backendusersapp.models.entities.Archivo;
import com.andres.backend.usersapp.backendusersapp.models.entities.Knowledge;
import com.andres.backend.usersapp.backendusersapp.repositories.ArchivoRepository;
import com.andres.backend.usersapp.backendusersapp.repositories.KnowledgeRepository;

@Service
public class ArchivoServiceImpl implements IArchivoService{
	@Autowired
	private ArchivoRepository repository;
	
	@Autowired
	private KnowledgeRepository knowledgeRepository;

	@Override
	public List<Archivo> getArchivos(Long know) {
		
		return repository.findByKnowledge(know);
	}

	@Override
	public Optional<Archivo> getArchivo(Long idKnow) {
		List<Archivo> archivos=getArchivos(idKnow);
		if(archivos.isEmpty()) {
			throw new KnowledgeException("No existe Archivo", 100);
		}

		return Optional.of(archivos.getFirst());
	}

	@Override
	public Archivo saveArchivo(Long idKnow, Archivo file) throws IOException {
		Optional<Knowledge> knowledge = knowledgeRepository.findById(idKnow);
        if (knowledge.isEmpty()) {
        	throw new KnowledgeException("No existe tema", 100);
        }
        Archivo archivo=new Archivo();
        List<Archivo> archivos=getArchivos(idKnow);
        if(!archivos.isEmpty()) {
        	archivo=archivos.getFirst();
        }   
        archivo.setKnowledge(knowledge.get());
        archivo.setNombre(file.getNombre());
        // Convertir el archivo a Base64
        String base64Archivo = file.getArchivo();
        archivo.setArchivo(base64Archivo);
		return repository.save(archivo);
	}

}
