package com.shop.services;

import com.shop.dto.cart.AddRequest;
import com.shop.dto.cart.CartItemRequest;
import com.shop.dto.cart.CartRequest;
import com.shop.dto.product.ProductRequest;
import com.shop.dto.user.UserRequest;
import com.shop.entity.cart.Cart;
import com.shop.entity.cart.CartItem;
import com.shop.entity.product.Product;
import com.shop.entity.user.User;
import com.shop.exception.CartException;
import com.shop.exception.ProductException;
import com.shop.exception.UserException;
import com.shop.repository.CartItemRepository;
import com.shop.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final AuthService authService;
    private final ProductService productService;

    //Cart Item Services

    public CartItemRequest createItem(CartItem cartItem){
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setPriceAfterDiscount(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());
        return mapToCartItemDTO(cartItemRepository.save(cartItem));
     }

    public CartItem findCartItemById(Long cartItemId) throws CartException {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isPresent()){
            return cartItem.get();
        }
        else throw new CartException("CartItem not found");
    }

    public CartItemRequest updateCartItem(Long cartItemId , CartItem cartItem) throws CartException {
        CartItem cartItemToUpdate = findCartItemById(cartItemId);

        cartItemToUpdate.setQuantity(cartItem.getQuantity());

        cartItemToUpdate.setPrice(cartItemToUpdate.getProduct().getPrice() * cartItemToUpdate.getQuantity());
        cartItemToUpdate.setPriceAfterDiscount(cartItemToUpdate.getProduct().getDiscountedPrice() * cartItemToUpdate.getQuantity());
        cartItemRepository.save(cartItemToUpdate);
        return mapToCartItemDTO(cartItemToUpdate);
    }

    public CartItemRequest isCartItemExist(Cart cart,Product product , Long userId){
        CartItem cartItem = cartItemRepository.isCartItemExist(cart,product,userId);
        return mapToCartItemDTO(cartItem);
    }

    public CartRequest removeCartItem(Long cartItemId) throws CartException {
        CartItem cartItem = findCartItemById(cartItemId);
        cartItemRepository.delete(cartItem);
        return findCart();
    }

    private CartItemRequest mapToCartItemDTO(CartItem cartItem) {
        return CartItemRequest
                .builder()
                .id(cartItem.getId())
                .cartId(cartItem.getCart().getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .productImage(cartItem.getProduct().getImage())
                .discount(cartItem.getProduct().getDiscount())
                .quantity(cartItem.getQuantity())
                .price(cartItem.getPrice())
                .size(cartItem.getSize())
                .priceAfterDiscount(cartItem.getPriceAfterDiscount())
                .userId(cartItem.getUserId())
                .build();
    }

    //Cart Services

    public CartRequest initiateCart(Long userId) throws UserException {
        User cartUser = authService.getUserById(userId);

        Cart cart = Cart.builder().user(cartUser).build();
        cartRepository.save(cart);
        return mapToCartDTO(cart);
    }

    public CartRequest addItemsToCart(AddRequest itemsToAdd) throws ProductException, CartException {
        UserRequest currentUser = authService.getCurrentUser();
        Cart cart = cartRepository.getCartByUser(currentUser.getId());
        Product product = productService.findProductById(itemsToAdd.getProductId());

        CartItem isItemPresent = cartItemRepository.isCartItemExist(cart,product,currentUser.getId());
        if(isItemPresent==null){
            CartItem cartItem = CartItem
                    .builder()
                    .product(product)
                    .cart(cart)
                    .quantity(itemsToAdd.getQuantity())
                    .userId(currentUser.getId())
                    .build();

            float price = itemsToAdd.getQuantity() * product.getPrice();
            float discountedPrice = itemsToAdd.getQuantity() * product.getDiscountedPrice();

            cartItem.setPrice(price);
            cartItem.setPriceAfterDiscount(discountedPrice);

            if(itemsToAdd.getSize()!=null){
                cartItem.setSize(itemsToAdd.getSize());
            }

            CartItemRequest createdItemRequest = createItem(cartItem);
            CartItem createdItem = findCartItemById(createdItemRequest.getId());
            cart.getCartItems().add(createdItem);

        }
        //cartRepository.save(cart);
        return findCart();
    }

    public CartRequest findCart(){
        UserRequest currentUser = authService.getCurrentUser();
        Cart cart = cartRepository.getCartByUser(currentUser.getId());
        float price = 0;
        float discountPrice = 0;
        int totalItems = 0;

        for(CartItem cartItem : cart.getCartItems()){
            price=price+cartItem.getPrice();
            discountPrice=discountPrice+cartItem.getPriceAfterDiscount();
            totalItems=totalItems+cartItem.getQuantity();

        }
        cart.setTotalPrice(price);
        cart.setTotalPriceAfterDiscount(discountPrice);
        cart.setTotalItems(totalItems);
        cart.setDiscount(price-discountPrice);

        Cart cart1 = cartRepository.save(cart);
        return mapToCartDTO(cart1);

    }

    public Cart getCartById(Long cartId) throws CartException{
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isPresent()){
            return cart.get();
        }
        else throw new CartException("Cart not found");
    }

    private CartRequest mapToCartDTO(Cart cart) {
        return CartRequest
                .builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .cartItems(
                        Optional.ofNullable(cart.getCartItems())
                                .orElse(Collections.emptySet())
                                .stream()
                                .map(this::mapToCartItemDTO)
                                .collect(Collectors.toSet())
                )
                .totalPrice(cart.getTotalPrice())
                .totalItems(cart.getTotalItems())
                .priceAfterDiscount(cart.getTotalPriceAfterDiscount())
                .discount(cart.getDiscount())
                .build();
    }







}
