package com.shop.entity.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String review;

    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name="userId")
    @JsonIgnore
    private User user;

    private LocalDateTime createdAt;
}
