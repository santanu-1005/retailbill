package com.retail.server.dto.product;

import com.retail.server.model.Product;

import lombok.Data;

@Data
public class ProductResponse {
    private String id;
    private String sku;
    private String name;
    private String category;   
    private String description;
    private double price;
    private double stock;

    // Mapper For The Invoice
    public static ProductResponse from(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setSku(product.getSku());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        return response;
    }
}
