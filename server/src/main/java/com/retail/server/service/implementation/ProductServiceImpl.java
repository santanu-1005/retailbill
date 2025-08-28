package com.retail.server.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.retail.server.dto.product.ProductRegisterRequest;
import com.retail.server.dto.product.ProductResponse;
import com.retail.server.model.Product;
import com.retail.server.repository.ProductRepository;
import com.retail.server.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public ProductResponse createProduct(ProductRegisterRequest productRequest) {
        try {
            Product newProduct = Product.builder()
                    .name(productRequest.getName())
                    .sku(productRequest.getSku())
                    .category(productRequest.getCategory())
                    .description(productRequest.getDescription())
                    .price(productRequest.getPrice())
                    .stock(productRequest.getStock())
                    .build();
            productRepository.save(newProduct);
            return convertToResponse(newProduct);
        } catch (Exception e) {
            throw new RuntimeException("Error creating product", e);
        }
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            return products.stream()
                    .map(this::convertToResponse)
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all products", e);
        }
    }

    @Override
    public ProductResponse getProductdetails(String productId) {
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return convertToResponse(product);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching product details", e);
        }
    }

    private ProductResponse convertToResponse(Product product) {
        try {
            ProductResponse response = new ProductResponse();
            response.setId(product.getId());
            response.setSku(product.getSku());
            response.setName(product.getName());
            response.setCategory(product.getCategory());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setStock(product.getStock());
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Error converting product to response", e);
        }
    }
}
