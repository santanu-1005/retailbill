package com.retail.server.dto.invoice;

import lombok.Data;

@Data
public class InvoiceItemRequest {
    private String productId;
    private int quantity;
    private double price; //per unit
    private double total;
}
