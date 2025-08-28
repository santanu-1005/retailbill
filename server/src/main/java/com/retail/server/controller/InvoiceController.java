package com.retail.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.server.dto.invoice.InvoiceRequest;
import com.retail.server.dto.invoice.InvoiceResponse;
import com.retail.server.service.InvoiceService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping("/create")
    public ResponseEntity<InvoiceResponse> createInvoice(@RequestBody InvoiceRequest invoiceRequest){
        
        return ResponseEntity.ok(invoiceService.createInvoice(invoiceRequest));
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceResponse> getInvoice(@PathVariable String invoiceId){
        return ResponseEntity.ok(invoiceService.getInvoice(invoiceId));
    }   

    @GetMapping("/c/{customerId}")
    public ResponseEntity<List<InvoiceResponse>> getInvoicesByCustomer(@PathVariable String customerId){
        return ResponseEntity.ok(invoiceService.getInvoicesByCustomer(customerId));
    }

    @GetMapping("/u/{userId}")
    public ResponseEntity<List<InvoiceResponse>> getInvoicesByUser(@PathVariable String userId){
        return ResponseEntity.ok(invoiceService.getInvoicesByUser(userId));
    }
}
