package com.retail.server.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.retail.server.dto.customer.CustomerRegisterRequest;
import com.retail.server.dto.customer.CustomerResponse;
import com.retail.server.model.Customer;
import com.retail.server.repository.CustomerRepository;
import com.retail.server.service.CustomerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public CustomerResponse getCustomerProfile(String customerId) {
        try {
            return customerRepository.findById(customerId)
                    .map(this::convertToResponse)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error fetching customer profile");
        }
    }

    @Override
    public CustomerResponse createCustomer(CustomerRegisterRequest customerRequest){
        try {
            Customer newCustomer = Customer.builder()
                                            .email(customerRequest.getEmail())
                                            .name(customerRequest.getName())
                                            .phone(customerRequest.getPhone())
                                            .address(customerRequest.getAddress())
                                            .userId(customerRequest.getUserId())
                                            .createdAt(customerRequest.getCreatedAt())
                                            .build();
            customerRepository.save(newCustomer);
            return convertToResponse(newCustomer);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create customer");
        }
    }

    @Override
    public List<CustomerResponse> getCustomersByUser(String userID){
        try {
            List<Customer> customers = customerRepository.findByUserId(userID);
            return customers.stream().map(this::convertToResponse).toList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching customers by user");
        }
    }

    private CustomerResponse convertToResponse(Customer customer) {
        try {
            CustomerResponse response = new CustomerResponse();
            response.setId(customer.getId());
            response.setEmail(customer.getEmail());
            response.setName(customer.getName());
            response.setPhone(customer.getPhone());
            response.setAddress(customer.getAddress());
            response.setUserId(customer.getUserId());
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Error converting customer to response");
        }
    }
}
