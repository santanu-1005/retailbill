package com.retail.server.service;

import java.util.List;

import com.retail.server.dto.invoice.InvoiceRequest;
import com.retail.server.dto.invoice.InvoiceResponse;

public interface InvoiceService {
    InvoiceResponse createInvoice(InvoiceRequest invoiceRequest);
    InvoiceResponse getInvoice(String invoiceId);
    List<InvoiceResponse> getInvoicesByCustomer(String customerId);
    List<InvoiceResponse> getInvoicesByUser(String userId);
}
