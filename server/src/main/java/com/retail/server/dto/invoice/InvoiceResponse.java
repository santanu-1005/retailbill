    package com.retail.server.dto.invoice;

    import java.time.LocalDateTime;
    import java.util.List;

    import lombok.Data;

    @Data
    public class InvoiceResponse {
        private String id;
        private String invoiceNumber;
        private String customerId;
        private String userId; 

        private List<InvoiceItemResponse> items;

        private double subtotal;
        private double tax;
        private double totalAmount;

        private String paymentMethod;
        private LocalDateTime createdAt;
    }

