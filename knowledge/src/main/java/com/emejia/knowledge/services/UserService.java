package com.emejia.knowledge.services;

import java.util.List;
import java.util.Optional;

import com.emejia.knowledge.model.dtos.UserDto;
import com.emejia.knowledge.model.dtos.UserRequest;
import com.emejia.knowledge.persistence.entities.User;

public interface UserService {
    
    List<UserDto> findAll();

    Optional<UserDto> findById(Long id);

    UserDto save(User user);
    Optional<UserDto> update(UserRequest user, Long id);

    void remove(Long id);
}

