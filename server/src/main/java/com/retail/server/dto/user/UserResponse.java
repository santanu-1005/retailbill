package com.retail.server.dto.user;

import java.util.List;

import com.retail.server.dto.customer.CustomerResponse;
import com.retail.server.model.User;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String email;
    private String username;
    private String password;
    private String name;
    private String role;
    private List<CustomerResponse> customers;

    // Mapper
    public static UserResponse from(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        return response;
    }
}
