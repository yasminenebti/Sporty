package com.shop.services;

import com.shop.entity.product.Product;
import com.shop.entity.product.Rating;
import com.shop.entity.product.Review;
import com.shop.entity.user.User;
import com.shop.exception.ProductException;
import com.shop.exception.UserException;
import com.shop.repository.RatingRepository;
import com.shop.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewRatingService {
    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final ProductService productService;
    private final AuthService authService;

    public Rating addRating (double rating,Long productId,Long userId) throws ProductException, UserException {
        Product product= productService.findProductById(productId);
        User user = authService.getUserById(userId);
        Rating createdRating = Rating
                .builder()
                .product(product)
                .user(user)
                .rating(rating)
                .createdAt(LocalDateTime.now())
                .build();
        return ratingRepository.save(createdRating);
    }

    public Review addReview (String review, Long productId, Long userId) throws ProductException, UserException {
        Product product= productService.findProductById(productId);
        User user = authService.getUserById(userId);
        Review createdReview = Review
                .builder()
                .product(product)
                .user(user)
                .review(review)
                .createdAt(LocalDateTime.now())
                .build();
        return reviewRepository.save(createdReview);
    }

    public List<Review> getReviewsProduct(Long productId){
        return reviewRepository.getReviewsByProduct(productId);
    }

    public List<Rating> getRatingsProduct(Long productId){
        return ratingRepository.getRatingsByProduct(productId);
    }


}
