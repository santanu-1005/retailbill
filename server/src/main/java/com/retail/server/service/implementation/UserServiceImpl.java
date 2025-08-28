package com.retail.server.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.retail.server.dto.auth.RegisterRequest;
import com.retail.server.dto.customer.CustomerResponse;
import com.retail.server.dto.user.UserResponse;
import com.retail.server.model.Customer;
import com.retail.server.model.User;
import com.retail.server.repository.CustomerRepository;
import com.retail.server.repository.UserRepository;
import com.retail.server.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Override
    public UserResponse createUser(RegisterRequest userRequest){
        try {
            if(userRepository.existsByEmail(userRequest.getEmail())){
                throw new Exception("User already exists");
            }
            User newUser = User.builder()
                                .email(userRequest.getEmail())
                                .password(userRequest.getPassword())
                                .name(userRequest.getName())
                                .role(userRequest.getRole())
                                .build();
            User savedUser = userRepository.save(newUser);
            return convertToResponse(savedUser);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create user");
        }
    }

    @Override
    public UserResponse getUserProfile(String userId) {
        try {
            User user = userRepository.findById(userId)
                                 .orElseThrow(() -> new RuntimeException("User not found"));
            UserResponse response = convertToResponse(user);

            //Fetch All the Customers for the User
            List<CustomerResponse> customers = customerRepository.findByUserId(userId)
                                                                .stream()
                                                                .map(this::convertToCustomerResponse)
                                                                .toList();
            response.setCustomers(customers);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch user profile" + userId);
        }
    }

    private UserResponse convertToResponse(User user){
        try {
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setEmail(user.getEmail());
            userResponse.setPassword(user.getPassword());
            userResponse.setName(user.getName());
            userResponse.setRole(user.getRole());
            return userResponse;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error converting user to response");
        }
    }

    private CustomerResponse convertToCustomerResponse(Customer customer){
        try {
            CustomerResponse customerResponse = new CustomerResponse();
            customerResponse.setId(customer.getId());
            customerResponse.setUserId(customer.getUserId());
            customerResponse.setName(customer.getName());
            customerResponse.setEmail(customer.getEmail());
            customerResponse.setPhone(customer.getPhone());
            customerResponse.setAddress(customer.getAddress());
            customerResponse.setCreatedAt(customer.getCreatedAt());
            return customerResponse;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error converting customer to response");
        }
    }
}