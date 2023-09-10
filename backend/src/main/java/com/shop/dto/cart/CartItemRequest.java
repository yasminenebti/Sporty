package com.shop.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CartItemRequest {
    private Long id;
    private Long cartId;
    private Long productId;
    private String productName;
    private String productImage;
    private List<String> productSize;
    private Integer quantity;
    private Integer discount;
    private float price;
    private float priceAfterDiscount;
    private Long userId;
}
