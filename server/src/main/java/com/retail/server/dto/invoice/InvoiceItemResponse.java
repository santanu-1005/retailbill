package com.retail.server.dto.invoice;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InvoiceItemResponse {
    private String productId;
    private String productName;
    private double price;
    private int quantity;
    private double total;
}
