package com.retail.server.dto.customer;

import java.time.LocalDateTime;

import com.retail.server.model.Customer;

import lombok.Data;

@Data
public class CustomerResponse {
    private String id;
    private String name;
    private String email;
    private String phone;  
    private String address;
    private LocalDateTime createdAt;
    private String userId;

    // Mapper For Invoice
    public static CustomerResponse from(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setId(customer.getId());
        response.setName(customer.getName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setCreatedAt(customer.getCreatedAt());
        response.setUserId(customer.getUserId());
        return response;
    }
}

