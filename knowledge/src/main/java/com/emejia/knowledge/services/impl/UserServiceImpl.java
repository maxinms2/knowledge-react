package com.emejia.knowledge.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emejia.knowledge.Exceptions.KnowledgeException;
import com.emejia.knowledge.persistence.entities.User;
import com.emejia.knowledge.persistence.repositories.UserRepository;
import com.emejia.knowledge.services.IUserService;
import com.emejia.knowledge.utils.Constants;


@Service
public class UserServiceImpl implements IUserService {

	private final UserRepository repository;

	public UserServiceImpl(UserRepository repository) {

		this.repository = repository;
	}

	@Override
	@Transactional
	public User save(User user) throws KnowledgeException {

		User db = repository.findByEmail(user.getEmail()).orElse(null);
		if (db != null) {
			throw new KnowledgeException("Ya existe este correo registrado", Constants.ERR_EXIST_MAIL);
		}

		return repository.save(user);
	}

	@Override
	public User findUser(String email) throws KnowledgeException {

		Optional<User> user = repository.findByEmail(email);

		if (user.isEmpty()) {
			throw new KnowledgeException("No existe usuario", Constants.ERR_NO_EXIST_USER);
		}
		user.get().setPassword("");
		return user.get();
	}

	@Override
	public void deleteUser(User user) {
		Optional<User> userDB = repository.findByEmail(user.getEmail());
		if (userDB.isPresent()) {
			repository.delete(userDB.get());
		}

	}

}
