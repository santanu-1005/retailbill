package com.retail.server.service;

import com.retail.server.dto.auth.RegisterRequest;
import com.retail.server.dto.user.UserResponse;

public interface UserService {
    UserResponse createUser(RegisterRequest registerRequest);
    UserResponse getUserProfile(String userId);
}
