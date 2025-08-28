package com.retail.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceItem {
    private String productId;
    private int quantity;
    private double price; //per unit
    private double total; // quantity * price
}
