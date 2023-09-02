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
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:discount IS NULL OR p.discount >= :discount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'priceLowToHigh' THEN p.price END ASC, " +
            "CASE WHEN :sort = 'priceHighToLow' THEN p.price END DESC, " +
            "p.createdAt DESC")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("discount") Integer discount,
            @Param("sort") String sort
    );
}
