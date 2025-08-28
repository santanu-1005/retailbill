package com.retail.server.service;

import java.util.List;

import com.retail.server.dto.product.ProductRegisterRequest;
import com.retail.server.dto.product.ProductResponse;

public interface ProductService {
    ProductResponse createProduct(ProductRegisterRequest productRequest);
    List<ProductResponse> getAllProducts();
    ProductResponse getProductdetails(String productId);
}
