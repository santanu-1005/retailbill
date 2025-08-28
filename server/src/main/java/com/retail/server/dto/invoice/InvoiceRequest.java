package com.retail.server.dto.invoice;

import java.util.List;

import lombok.Data;

@Data
public class InvoiceRequest {
    private String id;
    private String customerId;
    private String userId;

    private List<InvoiceItemRequest> items;

    private double tax; //client may send or backend apply default
    private String paymentMethod; //cash, card, UPI
}

