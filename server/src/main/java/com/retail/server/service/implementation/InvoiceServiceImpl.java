package com.retail.server.service.implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.retail.server.dto.invoice.InvoiceItemRequest;
import com.retail.server.dto.invoice.InvoiceItemResponse;
import com.retail.server.dto.invoice.InvoiceRequest;
import com.retail.server.dto.invoice.InvoiceResponse;
import com.retail.server.model.Customer;
import com.retail.server.model.Invoice;
import com.retail.server.model.InvoiceItem;
import com.retail.server.model.Product;
import com.retail.server.model.User;
import com.retail.server.repository.CustomerRepository;
import com.retail.server.repository.InvoiceRepository;
import com.retail.server.repository.ProductRepository;
import com.retail.server.repository.UserRepository;
import com.retail.server.service.InvoiceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    @Override
    public InvoiceResponse createInvoice(InvoiceRequest invoiceRequest) {
        try {
            User user = userRepository.findById(invoiceRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Customer customer = customerRepository.findById(invoiceRequest.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            List<InvoiceItem> items = invoiceRequest.getItems().stream()
                    .map((InvoiceItemRequest itemReq) -> {
                        Product product = productRepository.findById(itemReq.getProductId())
                                .orElseThrow(
                                        () -> new RuntimeException("Product not found: " + itemReq.getProductId()));
                        return InvoiceItem.builder()
                                .productId(product.getId())
                                .quantity(itemReq.getQuantity())
                                .price(itemReq.getPrice())
                                .total(itemReq.getTotal())
                                .build();
                    })
                    .collect(Collectors.toList());

            double subtotal = items.stream()
                    .mapToDouble(i -> i.getPrice() * i.getQuantity())
                    .sum();

            double tax = invoiceRequest.getTax(); // or compute default tax here

            double total = subtotal + tax;

            Invoice invoice = Invoice.builder()
                    .id(invoiceRequest.getId())
                    .invoiceNumber("INV-" + System.currentTimeMillis()) // Simple generator
                    .customerId(customer.getId())
                    .userId(user.getId())
                    .items(items)
                    .paymentMethod(invoiceRequest.getPaymentMethod())
                    .subTotal(subtotal)
                    .tax(tax)
                    .totalAmount(total)
                    .paymentMethod(invoiceRequest.getPaymentMethod())
                    .createdAt(LocalDateTime.now())
                    .build();

            Invoice saved = invoiceRepository.save(invoice);
            return convertToResponse(saved);

        } catch (Exception e) {
            throw new RuntimeException("Error creating invoice: " + e.getMessage());
        }
    }

    @Override
    public InvoiceResponse getInvoice(String invoiceId) {
        try {
            Invoice invoice = invoiceRepository.findById(invoiceId)
                    .orElseThrow(() -> new RuntimeException("Invoice not found"));

            return convertToResponse(invoice);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching invoice: " + e.getMessage());
        }
    };

    @Override
    public List<InvoiceResponse> getInvoicesByCustomer(String customerId) {
        try {
            List<Invoice> invoices = invoiceRepository.findByCustomerId(customerId);
            return invoices.stream()
                    .map(this::convertToResponse)
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching invoices by customer: " + e.getMessage());
        }
    };

    @Override
    public List<InvoiceResponse> getInvoicesByUser(String userId) {
        try {
            List<Invoice> invoices = invoiceRepository.findByUserId(userId);
            return invoices.stream()
                    .map(this::convertToResponse)
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching invoices by user: " + e.getMessage());
        }
    };

    private InvoiceResponse convertToResponse(Invoice invoice) {
        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setCustomerId(invoice.getCustomerId());
        response.setUserId(invoice.getUserId());
        response.setPaymentMethod(invoice.getPaymentMethod());
        response.setCreatedAt(invoice.getCreatedAt());

        // Optimize product fetching
        List<String> productIds = invoice.getItems().stream()
                .map(InvoiceItem::getProductId)
                .toList();

        Map<String, Product> ProductMap = productRepository.findAllById(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        List<InvoiceItemResponse> itemResponse = invoice.getItems().stream()
                .map(item -> {
                    Product product = ProductMap.get(item.getProductId());
                    return new InvoiceItemResponse(
                            item.getProductId(),
                            product != null ? product.getName() : null,
                            item.getPrice(),
                            item.getQuantity(),
                            item.getPrice() * item.getQuantity());
                }).collect(Collectors.toList());

        response.setItems(itemResponse);
        double subtotal = invoice.getItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        response.setSubtotal(subtotal);
        response.setTax(invoice.getTax());
        response.setTotalAmount(invoice.getTotalAmount());

        return response;
    }

}
