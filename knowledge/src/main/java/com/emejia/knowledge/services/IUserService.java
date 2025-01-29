package com.emejia.knowledge.services;

import com.emejia.knowledge.Exceptions.KnowledgeException;
import com.emejia.knowledge.persistence.entities.User;

public interface IUserService {
	
	User save(User user) throws KnowledgeException;
	
	User findUser(String email) throws KnowledgeException;
	
	void deleteUser(User user);
}
