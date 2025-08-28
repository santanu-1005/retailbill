package com.retail.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.server.dto.auth.JwtResponse;
import com.retail.server.dto.auth.LoginRequest;
import com.retail.server.dto.auth.RegisterRequest;
import com.retail.server.model.User;
import com.retail.server.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //signup
    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request){
        System.out.println(">>> Signup API called with email: " + request.getEmail());

       return ResponseEntity.ok(authService.registerUser(request));
    }

    //signin
    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginUser(request));
    }
} 
