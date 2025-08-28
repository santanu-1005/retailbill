package com.retail.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.retail.server.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String>{
    
}
