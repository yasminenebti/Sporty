package com.shop.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CartRequest {
    private Long id;
    private Long userId;
    private Set<CartItemRequest> cartItems = new HashSet<>();
    private double totalPrice;
    private Integer totalItems;
    private Integer priceAfterDiscount;
    private Integer discount;
}
