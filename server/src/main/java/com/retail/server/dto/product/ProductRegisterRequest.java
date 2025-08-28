package com.retail.server.dto.product;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductRegisterRequest {
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
