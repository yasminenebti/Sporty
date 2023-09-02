package com.shop.repository;

import com.shop.entity.cart.Cart;
import com.shop.entity.cart.CartItem;
import com.shop.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    @Query("select cartItem from CartItem cartItem where cartItem.cart= :cart and cartItem.product= :product and cartItem.userId= :userId")
    public CartItem isCartItemExist(Cart cart , Product product , Long userId);
}
