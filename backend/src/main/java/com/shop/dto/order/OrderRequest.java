package com.shop.dto.order;

import com.shop.entity.Address;
import lombok.Builder;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class OrderRequest {
    private Long id;
    private Long userId;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private List<OrderItemRequest> orderItems = new ArrayList<>();
    private String addressShippingCity;
    private String addressShippingStreet;
    private String addressShippingState;
    private String addressShippingZipCode;
    private double totalPrice;
    private double totalPriceDiscounted;
    private float priceAfterDiscount;
    private float discount;
    private String orderStatus;
    private Integer totalItems;
    private String createdAt;
}
