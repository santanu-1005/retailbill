package com.retail.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.retail.server.dto.user.UserRegisterRequest;
import com.retail.server.dto.user.UserResponse;
import com.retail.server.service.UserService;

// import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    // @PostMapping("/register")
    // public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRegisterRequest registerRequest){
    //     return ResponseEntity.ok(userService.createUser(registerRequest));
    // }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    // @GetMapping("/{userId}/customers")
    // public ResponseEntity<List<Customer>> getUserCustomers(@PathVariable String userId) {
    //     return ResponseEntity.ok(userService.getUserCustomers(userId));
    // }

}
