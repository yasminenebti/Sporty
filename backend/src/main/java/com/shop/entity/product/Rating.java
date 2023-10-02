package com.shop.entity.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="userId")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name="productId")
    @JsonIgnore
    private Product product;

    private double rating;

    private LocalDateTime createdAt;







}

