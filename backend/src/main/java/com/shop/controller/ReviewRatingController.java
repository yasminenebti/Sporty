package com.shop.controller;

import com.shop.entity.Address;
import com.shop.exception.CartException;
import com.shop.exception.ProductException;
import com.shop.exception.UserException;
import com.shop.services.OrderService;
import com.shop.services.ReviewRatingService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewRatingController {
    private final ReviewRatingService reviewRatingService;

    @PostMapping("/review/{productId}")
    public ResponseEntity<?> createReview(@RequestBody String review , @PathVariable Long productId) throws UserException, ProductException {
        return ResponseEntity.ok(reviewRatingService.addReview(review,productId));
    }

    @GetMapping("/review/{productId}")
    public ResponseEntity<?> getReviewByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewRatingService.getReviewsProduct(productId));
    }
}
