package com.shop.controller;

import com.shop.dto.cart.AddRequest;
import com.shop.entity.cart.CartItem;
import com.shop.entity.product.Product;
import com.shop.exception.CartException;
import com.shop.exception.ProductException;
import com.shop.exception.UserException;
import com.shop.services.CartService;
import com.shop.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> createCart(@PathVariable Long userId) throws UserException {
        return ResponseEntity.ok(cartService.initiateCart(userId));
    }
    @PutMapping
    public ResponseEntity<?> addItemToCart(@RequestBody AddRequest itemsToAdd) throws CartException, ProductException {
        return ResponseEntity.ok(cartService.addItemsToCart(itemsToAdd));
    }
    @GetMapping
    public ResponseEntity<?> getCart() {
        return ResponseEntity.ok(cartService.findCart());
    }
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> deleteItemFromCart(@PathVariable Long cartItemId) throws CartException {
        return ResponseEntity.ok(cartService.removeCartItem(cartItemId));
    }
    @PutMapping("/{cartItemId}")
    public ResponseEntity<?> deleteItemFromCart(@PathVariable Long cartItemId , @RequestBody CartItem cartItem) throws CartException {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId,cartItem));
    }

}
