package com.retail.server.service;

import java.util.List;

import com.retail.server.dto.customer.CustomerRegisterRequest;
import com.retail.server.dto.customer.CustomerResponse;

public interface CustomerService {
    CustomerResponse getCustomerProfile(String customerId);
    List<CustomerResponse> getCustomersByUser(String userId);
    CustomerResponse createCustomer(CustomerRegisterRequest customerRequest);
}
