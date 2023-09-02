package com.shop.entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String description;
    private Integer price;
    private Integer discount;

    private Integer discountedPrice;
    private Integer quantity;
    private String color;
    private String image;
    @Embedded
    @ElementCollection
    @Column(name = "sizes")
    private Set<Size> sizes = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private List<Rating> rating = new ArrayList<>();

    private Integer nbRating;
    @OneToMany(mappedBy = "product")
    private List<Review> review = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="categoryId")
    private Category category;
    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();





}
