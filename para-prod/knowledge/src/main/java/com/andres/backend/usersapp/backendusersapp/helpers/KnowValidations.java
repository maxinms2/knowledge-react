package com.andres.backend.usersapp.backendusersapp.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.andres.backend.usersapp.backendusersapp.models.entities.Knowledge;
import com.andres.backend.usersapp.backendusersapp.models.entities.User;
import com.andres.backend.usersapp.backendusersapp.repositories.UserRepository;

@Component
public class KnowValidations {
	@Autowired
	private UserRepository userRepository;

	public Boolean isKnowAuthorizer(Knowledge knowledge) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User userAuthenticated = userRepository.findByUsername(authentication.getName()).get();
		System.out.println("user: " + authentication.getName());
		if (knowledge.getParent().getId() == 1 && knowledge.getId() == null) {
			knowledge.setUser(userAuthenticated);
			return true;
		}
		User user = knowledge.getUser();
		String userName = "";
		if (user == null) {
			user = knowledge.getParent().getUser();
			knowledge.setUser(user);
			if (user == null) {
				return false;
			}
		}
		userName = user.getUsername();
		return isEqualsToUserAuthenticated(userName, userAuthenticated);
	}

	public Boolean isEqualsToUserAuthenticated(String userName, User userAuthenticated) {
		Boolean isAdmin = userAuthenticated.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_ADMIN"));
		if (isAdmin || userName.equals(userAuthenticated.getUsername())) {
			return true;
		}
		return false;
	}

}
