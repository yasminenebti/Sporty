package com.shop.dto.order;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class OrderItemRequest {
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private String productImage;

    private List<String> productSize;
    private String size;

    private float price;
    private float priceAfterDiscount;
    private Integer discount;
    private Long userId;

    private LocalDateTime deliveryAt;
}
