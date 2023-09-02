package com.shop.entity.cart;

import com.shop.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User user;

    @OneToMany(mappedBy = "cart",orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>();

    private double totalPrice;
    private int totalItems;
    private int totalPriceAfterDiscount;
    private int discount;

}
