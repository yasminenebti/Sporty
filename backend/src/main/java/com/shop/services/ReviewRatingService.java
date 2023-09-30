package com.shop.services;

import com.shop.dto.product.ProductRequest;
import com.shop.dto.reviewandrating.ReviewDto;
import com.shop.dto.user.UserRequest;
import com.shop.entity.product.Product;
import com.shop.entity.product.Rating;
import com.shop.entity.product.Review;
import com.shop.entity.user.User;
import com.shop.exception.ProductException;
import com.shop.exception.UserException;
import com.shop.repository.ProductRepository;
import com.shop.repository.RatingRepository;
import com.shop.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewRatingService {
    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;
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

    public ReviewDto addReview (String review, Long productId) throws ProductException, UserException {
        Product product= productService.findProductById(productId);
        UserRequest currentUser = authService.getCurrentUser();
        User user = authService.getUserById(currentUser.getId());
        Review createdReview = Review
                .builder()
                .product(product)
                .user(user)
                .review(review)
                .createdAt(LocalDateTime.now())
                .build();
        Review newReview= reviewRepository.save(createdReview);
        product.getReview().add(newReview);
        productRepository.save(product);
        return mapToReviewDto(newReview);
    }

    public List<ReviewDto> getReviewsProduct(Long productId) {
        List<Review> reviews = reviewRepository.getReviewsByProduct(productId);

        return reviews.stream()
                .map(this::mapToReviewDto)
                .collect(Collectors.toList());
    }

    public List<Rating> getRatingsProduct(Long productId){
        return ratingRepository.getRatingsByProduct(productId);
    }

    private ReviewDto mapToReviewDto(Review review) {
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("d'st' MMMM yyyy 'at' h:mm a", Locale.ENGLISH);

        String formattedCreatedAt = review.getCreatedAt().format(customFormatter);
        return ReviewDto.builder()
                .id(review.getId())
                .review(review.getReview())
                .userFirstName(review.getUser().getFirstName())
                .userLastName(review.getUser().getLastName())
                .userImage(review.getUser().getPicture())
                .productId(review.getProduct().getId())
                .createdAt(formattedCreatedAt)
                .build();
    }


}
