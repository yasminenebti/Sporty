package com.shop.repository;

import com.shop.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p " +
            "WHERE (:category IS NULL OR p.category.name = :category) " +
            "AND (:minPrice IS NULL OR p.discountedPrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.discountedPrice <= :maxPrice) " +
            "AND (:discount IS NULL OR p.discount >= :discount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'priceLowToHigh' THEN p.price END ASC, " +
            "CASE WHEN :sort = 'priceHighToLow' THEN p.price END DESC, " +
            "p.createdAt DESC")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") Float minPrice,
            @Param("maxPrice") Float maxPrice,
            @Param("discount") Integer discount,
            @Param("sort") String sort
    );

    @Query("select p from Product p ORDER BY p.createdAt DESC LIMIT 10")
    List<Product> recentProducts();
}