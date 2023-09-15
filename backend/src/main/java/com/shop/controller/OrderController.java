package com.shop.controller;

import com.shop.entity.Address;
import com.shop.exception.CartException;
import com.shop.exception.CategoryException;
import com.shop.exception.OrderException;
import com.shop.exception.UserException;
import com.shop.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("")
    public ResponseEntity<?> createOrder(@RequestBody Address address) throws CartException, UserException {
        return ResponseEntity.ok(orderService.createOrder(address));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> findOrderById(@PathVariable Long orderId) throws OrderException {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
}
