package com.taskmanager.pro.service;



import org.springframework.stereotype.Service;


import com.taskmanager.pro.model.User;

import com.taskmanager.pro.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User creatUser(User user){
        return userRepository.save(user);
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    }
    
    

    
    
}
