package com.shop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.shop.dto.payment.PaymentMethodDto;
import com.shop.exception.OrderException;
import com.shop.services.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;


    @GetMapping("/{orderId}")
    public ResponseEntity<?> createProduct(@PathVariable Long orderId) throws StripeException, OrderException{
        return ResponseEntity.ok(paymentService.createPayment(orderId));
    }
}
