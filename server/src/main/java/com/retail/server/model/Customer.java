package com.retail.server.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "customers")
public class Customer {
    @Id
    private String id;

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

    private String userId;
}
