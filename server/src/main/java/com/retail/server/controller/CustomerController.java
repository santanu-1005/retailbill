package com.retail.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.server.dto.customer.CustomerRegisterRequest;
import com.retail.server.dto.customer.CustomerResponse;
import com.retail.server.service.CustomerService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {
    private CustomerService customerService;
    
    @PostMapping("/register")
    public ResponseEntity<CustomerResponse> createCustomer(@Valid @RequestBody CustomerRegisterRequest customerRequest){
        return ResponseEntity.ok(customerService.createCustomer(customerRequest));
    }
    @GetMapping("/customerId")
    public ResponseEntity<CustomerResponse> getCustomerProfile(@PathVariable String customerId){
        return ResponseEntity.ok(customerService.getCustomerProfile(customerId));
    }

    @GetMapping("/u/{userId}")
    public ResponseEntity<List<CustomerResponse>> getCustomersByUser(@PathVariable String userId){
        return ResponseEntity.ok(customerService.getCustomersByUser(userId));
    }

}
