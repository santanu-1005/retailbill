package com.retail.server.service.implementation;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.retail.server.dto.auth.JwtResponse;
import com.retail.server.dto.auth.LoginRequest;
import com.retail.server.dto.auth.RegisterRequest;
import com.retail.server.model.User;
import com.retail.server.repository.UserRepository;
import com.retail.server.security.JwtUtils;
import com.retail.server.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public User registerUser(RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists with email: " + request.getEmail());
            }

            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setName(request.getName());
            user.setRole(request.getRole());

            User savedUser = userRepository.save(user);
            log.info("User registered successfully: {}", savedUser.getEmail());
            return savedUser;
        } catch (Exception e) {
            log.error("Error registering user", e);
            throw new RuntimeException("Error registering user", e);
        }
    }

@Override
public JwtResponse loginUser(LoginRequest request) {
    try {
        log.info("Attempting login for {}", request.getEmail());

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
        );
        log.info("Authentication successful for {}", request.getEmail());

        return userRepository.findByEmail(request.getEmail())
                .map(user -> {
                    String token = jwtUtils.generateToken(user);
                    log.info("Generated token for {}: {}", user.getEmail(), token);
                    JwtResponse response = new JwtResponse(token, user.getId(), user.getEmail(), user.getRole());
                    log.info("Returning JwtResponse: {}", response);
                    return response;
                })
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));
    } catch (Exception e) {
        log.error("Error logging in user", e);
        throw new RuntimeException("Error logging in user", e);
    }
}

}
