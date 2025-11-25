package com.groovegallery.service;

import com.groovegallery.dto.AuthResponse;
import com.groovegallery.dto.LoginRequest;
import com.groovegallery.dto.RegisterRequest;
import com.groovegallery.model.User;
import com.groovegallery.repository.UserRepository;
import com.groovegallery.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("MISSION FAILED: Agent email already registered");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("MISSION FAILED: Agent codename already taken");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRegisteredAt(LocalDateTime.now());

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getUsername());

        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            "AGENT REGISTERED: Welcome to the mission"
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("ACCESS DENIED: Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("ACCESS DENIED: Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getUsername());

        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            "ACCESS GRANTED"
        );
    }

    public boolean validateToken(String token) {
        try {
            String email = jwtUtil.extractEmail(token);
            return userRepository.existsByEmail(email);
        } catch (Exception e) {
            return false;
        }
    }
}
