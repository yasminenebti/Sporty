package com.shop.controller;

import com.shop.dto.user.AuthenticationResponse;
import com.shop.dto.user.RegisterRequest;
import com.shop.entity.product.Product;
import com.shop.exception.ProductException;
import com.shop.services.ProductService;
import jakarta.mail.MessagingException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestBody Product product
            ) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getFilteredProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Float minPrice,
            @RequestParam(required = false) Float maxPrice,
            @RequestParam(required = false) Integer discount,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) List<String> colors,
            @RequestParam int page,
            @RequestParam int pageSize
    )  {
        return ResponseEntity.ok(productService.getFilteredProducts(category, minPrice, maxPrice, discount, sort, stock, sizes, colors, page, pageSize));
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentProducts() {
        return ResponseEntity.ok(productService.recentProducts());
    }


    @GetMapping("/{productId}")
    public ResponseEntity<?> findProductById(@PathVariable Long productId) throws ProductException {
        return ResponseEntity.ok(productService.findProductById(productId));
    }
}
