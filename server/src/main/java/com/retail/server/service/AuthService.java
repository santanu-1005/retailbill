package com.retail.server.service;

import com.retail.server.dto.auth.JwtResponse;
import com.retail.server.dto.auth.LoginRequest;
import com.retail.server.dto.auth.RegisterRequest;
import com.retail.server.model.User;

public interface AuthService {
    User registerUser(RegisterRequest request);
    JwtResponse loginUser(LoginRequest request);
}
