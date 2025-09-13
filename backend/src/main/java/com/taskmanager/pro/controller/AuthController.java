package com.taskmanager.pro.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.pro.repository.UserRepository;
import com.taskmanager.pro.service.UserService;
import com.taskmanager.pro.utils.JwtUtil;
import com.taskmanager.pro.model.Role;
import com.taskmanager.pro.model.User;  

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String,String> body){
    String email = body.get("email");
    String password = passwordEncoder.encode(body.get("password"));

    // Check if email already exists
    if (userRepository.findByEmail(email).isPresent()){
        return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
    }

    // Create user with default role USER
    User newUser = User.builder()
            .email(email)
            .password(password)
            .role(Role.USER)   // <-- assign default role here
            .build();

    userService.creatUser(newUser);

    return new ResponseEntity<>("Successfully registered", HttpStatus.CREATED);
}
   

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody Map<String,String> body){
    String email = body.get("email");
    String password = body.get("password");

    var userOptional = userRepository.findByEmail(email);
    if(userOptional.isEmpty()){
        return new ResponseEntity<>("User not Registered", HttpStatus.UNAUTHORIZED);
    }

    User user = userOptional.get();
    if (!passwordEncoder.matches(password, user.getPassword())){
        return new ResponseEntity<>("Invalid User", HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT
    String token = jwtUtil.generateToken(user);

    // Return token + user info
    Map<String, Object> response = Map.of(
        "token", token,
        "email", user.getEmail(),
        "role", user.getRole().name()
    );

    return ResponseEntity.ok(response);
}


}
