package com.shop.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CartItemRequest {
    private Long id;
    private Long cartId;
    private Long productId;
    private String size;
    private Integer quantity;
    private Integer price;
    private Integer priceAfterDiscount;
    private Long userId;
}
