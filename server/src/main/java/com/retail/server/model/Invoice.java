package com.retail.server.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "invoices")
@Builder
public class Invoice {
    @Id
    private String id;
    
    private String invoiceNumber;
    private String customerId;
    private String userId;

    private List<InvoiceItem> items;

    private double subTotal;
    private double tax;
    private double totalAmount;

    private String paymentMethod;

    @CreatedDate
    private LocalDateTime createdAt;
}
