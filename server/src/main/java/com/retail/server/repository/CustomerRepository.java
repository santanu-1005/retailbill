package com.retail.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.retail.server.model.Customer;
import java.util.List;


public interface CustomerRepository extends MongoRepository<Customer, String>{
    List<Customer> findByUserId(String userId);
}
