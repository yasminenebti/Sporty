package com.shop.entity.product;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String description;
    private float price;
    private Integer discount;

    private float discountedPrice;
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
