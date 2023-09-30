package com.shop.dto.reviewandrating;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Builder
@Getter
@Setter
public class ReviewDto {

    private Long id;
    private String review;

    private Long productId;

    private String userFirstName;
    private String userLastName;
    private String userImage;



    private String createdAt;
}
