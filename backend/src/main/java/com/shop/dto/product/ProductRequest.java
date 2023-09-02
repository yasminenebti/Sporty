package com.shop.dto.product;

import com.shop.entity.product.Rating;
import com.shop.entity.product.Review;
import com.shop.entity.product.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class ProductRequest {
    private String name;
    private String description;
    private Integer price;
    private Integer discount;
    private Integer discountedPrice;
    private Integer quantity;
    private String color;
    private String image;
    private Set<Size> sizes = new HashSet<>();
    private List<Rating> rating = new ArrayList<>();

    private Integer nbRating;

    private List<Review> review = new ArrayList<>();

    private String category;
    private String category1;
    private String category2;

    private String category3;


    private LocalDateTime createdAt;



}
