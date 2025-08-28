package com.retail.server.dto.customer;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerRegisterRequest {
    private String name;

    @Indexed(unique = true)
    @NotBlank(message = "Email is required")
    private String email;

    @Indexed(unique = true)
    @NotBlank(message = "Phone is required")
    private String phone;

    private String address;

    @CreatedDate
    private LocalDateTime createdAt;

    @NotBlank(message = "User ID is required")
    private String userId;
}
