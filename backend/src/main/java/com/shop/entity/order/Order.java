package com.shop.entity.order;

import com.shop.entity.Address;
import com.shop.entity.payment.PaymentDetails;
import com.shop.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne
    private Address addressShipping;
    @Embedded
    private PaymentDetails paymentDetails = new PaymentDetails();

    private double totalPrice;
    private double totalPriceDiscounted;
    private Integer priceAfterDiscount;

    private Integer discount;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private Integer totalItems;
    private LocalDateTime createdAt;

}
