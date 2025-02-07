package com.andres.backend.usersapp.backendusersapp.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andres.backend.usersapp.backendusersapp.exceptions.KnowledgeException;
import com.andres.backend.usersapp.backendusersapp.helpers.KnowValidations;
import com.andres.backend.usersapp.backendusersapp.models.dto.KnowledgeDTO;
import com.andres.backend.usersapp.backendusersapp.models.dto.mapper.KnowledgeMapper;
import com.andres.backend.usersapp.backendusersapp.models.entities.Knowledge;
import com.andres.backend.usersapp.backendusersapp.models.entities.User;
import com.andres.backend.usersapp.backendusersapp.models.utils.PositionTree;
import com.andres.backend.usersapp.backendusersapp.repositories.KnowledgeRepository;
import com.andres.backend.usersapp.backendusersapp.repositories.UserRepository;
import com.andres.backend.usersapp.backendusersapp.utils.Constants;

import jakarta.persistence.EntityNotFoundException;

@Service
public class KnowledgeServiceImpl implements IKnowledgeService {

	private final KnowledgeRepository repository;
	private final KnowledgeMapper mapper;
	private final UserRepository userRepository;
	
	@Autowired
	private KnowValidations knowValidations;

	public KnowledgeServiceImpl(KnowledgeRepository repository, KnowledgeMapper mapper,UserRepository userRepository) {
		this.repository = repository;
		this.mapper = mapper;
		this.userRepository = userRepository;
	}

	@Transactional
	public KnowledgeDTO createKnowledge(KnowledgeDTO dto) throws KnowledgeException {
		Knowledge parent=null;
		Knowledge knowledge = repository.findByTitle(dto.getTitle().trim());
		if (knowledge != null) {
			if (dto.getId() == null) {
				throw new KnowledgeException("Ya existe este tema registrado", Constants.ERR_EXIST_KNOWLEDGE);
			}
			dto.setParentId(knowledge.getParent().getId());
		}

		if (dto.getId() == null) {
			knowledge = new Knowledge();
		} 
		knowledge.setTitle(dto.getTitle());
		knowledge.setContent(dto.getContent());
		knowledge.setCreatedAt(new Date());
		knowledge.setUpdatedAt(new Date());
		if (dto.getParentId() != null) {
			parent = repository.findById(dto.getParentId())
					.orElseThrow(() -> new EntityNotFoundException("Parent not found"));
		} else {
			throw new KnowledgeException("Debe tener un tema base", Constants.ERR_KNOWLEDGE);
		}
		knowledge.setParent(parent);
		knowledge.setType(dto.getType());
		Optional<User> user=userRepository.findByUsername(dto.getUser());
		if(!knowValidations.isKnowAuthorizer(dto,user.get())){
			throw new KnowledgeException("No es el propietario de este tema", Constants.ERR_KNOWLEDGE);
		}
		knowledge.setUser(user.get());
		return mapper.entityToDTO(repository.save(knowledge));
	}

	@Transactional(readOnly = true)
	public List<Knowledge> getTree(Long rootId) {
		return repository.findByParentId(rootId).stream().filter(k -> k.getParent().getId() != k.getId())
				.sorted(Comparator.comparing(k -> k.getTitle().toLowerCase())).collect(Collectors.toList());
	}

	@Override
	public Knowledge nullObject() {
		// TODO Auto-generated method stub
		Knowledge nullObj = new Knowledge();
		nullObj.setId(0l);
		nullObj.setChildren(new ArrayList<>());
		nullObj.setContent("");
		nullObj.setCreatedAt(new Date(1970, 1, 1));
		nullObj.setUpdatedAt(new Date(1970, 1, 1));
		nullObj.setParent(null);
		return nullObj;
	}

	@Override
	@Transactional(readOnly = true)
	public KnowledgeDTO getKnowledge(PositionTree positionTree) {
		Optional<Knowledge> knowledge = repository.findById(positionTree.getId());
		KnowledgeDTO dto = null;
		if (knowledge.isPresent()) {
			dto = getKnowledge(positionTree, entityToDTO(knowledge.get()));
		}
		return dto;
	}

	private KnowledgeDTO getKnowledge(PositionTree positionTree, KnowledgeDTO dto) {
		List<Knowledge> Knowledges = getTree(positionTree.getId());
		if (positionTree.getDeep() == 0 || Knowledges.isEmpty()) {
			return dto;
		}
		Knowledges.forEach(k -> dto.getChildren()
				.add(getKnowledge(new PositionTree(positionTree.getDeep() - 1, k.getId()), entityToDTO(k))));
		return dto;
	}

	private KnowledgeDTO entityToDTO(Knowledge knowledge) {
		KnowledgeDTO dto = new KnowledgeDTO();
		dto.setChildren(new ArrayList<>());
		dto.setContent(knowledge.getContent());
		dto.setCreatedAt(knowledge.getCreatedAt());
		dto.setId(knowledge.getId());
		dto.setParentId(knowledge.getParent().getId());
		dto.setTitle(knowledge.getTitle());
		dto.setUpdatedAt(knowledge.getUpdatedAt());
		return dto;
	}

	@Override
	@Transactional
	public void delete(Long rootId) {
		if (rootId > 1) {
			repository.deleteById(rootId);
		}

	}

	@Override
	@Transactional(readOnly = true)
	public List<KnowledgeDTO> findByText(String text) {
		List<Knowledge> knowledges = repository.findByText(text);
		List<KnowledgeDTO> knowledgesDTO = knowledges.stream().map(k -> mapper.entityToDTO(k))
				.sorted(Comparator.comparing((k -> k.getTitle().toLowerCase()))).collect(Collectors.toList());
		return knowledgesDTO;
	}

	@Override
	@Transactional
	public Long restore(List<KnowledgeDTO> respaldo) {

		respaldo = respaldo.stream().sorted(Comparator.comparing(KnowledgeDTO::getId)).collect(Collectors.toList());
		List<KnowledgeDTO> respParents = new ArrayList(respaldo);
		Map<String, String> parents = new HashMap<>();

		respaldo.forEach(k -> {
			parents.put(k.getTitle(),
					respParents.stream().filter(p -> p.getId().equals(k.getParentId())).findFirst().get().getTitle());
			if (k.getId() > 1) {
				Knowledge knowledge = mapper.dtoToEntity(k);
				repository.save(knowledge);
			}
		});

		parents.entrySet().stream().forEach(entry -> {
			Knowledge knowledge = repository.findByTitle(entry.getKey());
			knowledge.setParent(repository.findByTitle(entry.getValue()));
		});
		return repository.count();
	}

}
