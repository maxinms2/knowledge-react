package com.andres.backend.usersapp.backendusersapp.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.andres.backend.usersapp.backendusersapp.models.dto.KnowledgeDTO;
import com.andres.backend.usersapp.backendusersapp.models.entities.User;
import com.andres.backend.usersapp.backendusersapp.repositories.UserRepository;

@Component
public class KnowValidations {
	@Autowired
	private UserRepository userRepository;

	public Boolean isKnowAuthorizer(KnowledgeDTO dto,User user) {
		if (dto.getUser() == null) {
			return false;
		}
		if(dto.getParentId()==1) {
			return true;
		}
		String userName="";
		if(user==null) {
			user=userRepository.findById(dto.getParentId()).get();
			if(user==null) {
				return false;
			}
			userName=user.getUsername();
		}		
		return isEqualsToUserAuthenticated(user, userName);
	}

	private Boolean isEqualsToUserAuthenticated(User user, String userName) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			Boolean isAdmin=user.getRoles().stream().anyMatch(r->r.getName().equals("ROLE_ADMIN"));
			if(isAdmin || userName.equals(authentication.getName())) {
				return true;
			}
			
		}
		return false;
	}

}
