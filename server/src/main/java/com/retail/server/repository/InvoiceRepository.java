package com.retail.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.retail.server.model.Invoice;

public interface InvoiceRepository extends MongoRepository<Invoice, String>{
    List<Invoice> findByCustomerId(String customerId);
    List<Invoice> findByUserId(String userId);
}
