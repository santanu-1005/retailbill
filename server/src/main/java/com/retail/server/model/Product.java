package com.retail.server.model;

import org.springframework.data.annotation.Id;
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
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String sku;

    @NotBlank
    private String category;

    @NotBlank   
    private String description;
    
    @NotBlank
    private double price;
    
    @NotBlank
    private double stock;
}
