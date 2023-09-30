package com.shop.services;

import com.shop.dto.cart.CartItemRequest;
import com.shop.dto.cart.CartRequest;
import com.shop.dto.order.OrderItemRequest;
import com.shop.dto.order.OrderRequest;
import com.shop.dto.user.UserRequest;
import com.shop.entity.Address;
import com.shop.entity.cart.Cart;
import com.shop.entity.cart.CartItem;
import com.shop.entity.order.Order;
import com.shop.entity.order.OrderItem;
import com.shop.entity.order.OrderStatus;
import com.shop.entity.user.User;
import com.shop.exception.CartException;
import com.shop.exception.OrderException;
import com.shop.exception.UserException;
import com.shop.repository.AddressRepository;
import com.shop.repository.OrderItemRepository;
import com.shop.repository.OrderRepository;
import com.shop.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Product;
import com.stripe.param.ProductCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    @Value("${stripe.secretKey}")
    private String secretKey;
    //private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yy HH:mm");



    public OrderItemRequest createOrderItem(OrderItem orderItem){
        return mapToOrderItemDTO(orderItemRepository.save(orderItem));
    }

    public OrderRequest createOrder(Address shipAddress) throws UserException, CartException, StripeException {
        Stripe.apiKey = secretKey;

        UserRequest currentUser = authService.getCurrentUser();
        User orderUser = authService.getUserById(currentUser.getId());
        shipAddress.setUser(orderUser);
        Address address = addressRepository.save(shipAddress);
        orderUser.getAddress().add(address);
        userRepository.save(orderUser);

        CartRequest cartRequest = cartService.findCart();
        Cart cart = cartService.getCartById(cartRequest.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()){
            OrderItem orderItem = OrderItem
                    .builder()
                    .price(cartItem.getPrice())
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .size(cartItem.getSize())
                    .userId(cartItem.getUserId())
                    .priceAfterDiscount(cartItem.getPriceAfterDiscount())
                    .build();
            orderItemRepository.save(orderItem);
            orderItems.add(orderItem);

        }

        Order order = Order
                .builder()
                .user(orderUser)
                .orderItems(orderItems)
                .totalPrice(cart.getTotalPrice())
                .totalPriceDiscounted(cart.getTotalPriceAfterDiscount())
                .discount(cart.getDiscount())
                .totalItems(cart.getTotalItems())
                .addressShipping(address)
                .createdAt(LocalDateTime.now())
                .orderStatus(OrderStatus.PENDING)
                .build();
        Order saved = orderRepository.save(order);


        for (OrderItem item : orderItems){
            item.setOrder(order);
            orderItemRepository.save(item);
        }

        Product.create(new ProductCreateParams.Builder()
                .setId(saved.getId().toString())
                .setName("order from sporty")
                .setType(ProductCreateParams.Type.GOOD)
                .build());
        return mapToOrderDto(saved);
    }

    public OrderRequest getOrderById(Long orderId) throws OrderException {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()){
            return mapToOrderDto(order.get());
        }
        else throw new OrderException("Cart not found");
    }

    public OrderRequest placeOrder(Long orderId) throws OrderException {
        OrderRequest order = getOrderById(orderId);
        Order orderPlaced = orderRepository.findById(order.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        orderPlaced.setOrderStatus(OrderStatus.PLACED);
        orderRepository.save(orderPlaced);
        //getPaymeDetais.setStatus.completed
        return mapToOrderDto(orderPlaced);
    }
    public OrderRequest confirmOrder(Long orderId) throws OrderException {
        OrderRequest order = getOrderById(orderId);
        Order orderPlaced = orderRepository.findById(order.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        orderPlaced.setOrderStatus(OrderStatus.CONFIRMED);
        orderRepository.save(orderPlaced);
        return mapToOrderDto(orderPlaced);
    }
    public OrderRequest shipOrder(Long orderId) throws OrderException {
        OrderRequest order = getOrderById(orderId);
        Order orderPlaced = orderRepository.findById(order.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        orderPlaced.setOrderStatus(OrderStatus.SHIPPED);
        return mapToOrderDto(orderPlaced);
    }
    public OrderRequest deliverOrder(Long orderId) throws OrderException {
        OrderRequest order = getOrderById(orderId);
        Order orderPlaced = orderRepository.findById(order.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        orderPlaced.setOrderStatus(OrderStatus.DELIVERED);
        orderRepository.save(orderPlaced);
        return mapToOrderDto(orderPlaced);
    }

    public OrderRequest cancelOrder(Long orderId) throws OrderException {
        OrderRequest order = getOrderById(orderId);
        Order orderPlaced = orderRepository.findById(order.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        orderPlaced.setOrderStatus(OrderStatus.CANCELED);
        orderRepository.save(orderPlaced);
        return mapToOrderDto(orderPlaced);
    }

    public List<Order> historyOrders(Long userId){
        return orderRepository.getOrderByUser(userId);
    }
    public List<Order> allOrders(){
        return orderRepository.findAll();
    }

    public void deleteOrder(Long orderId) {

        orderRepository.deleteById(orderId);
    }


    private OrderItemRequest mapToOrderItemDTO(OrderItem orderItem) {
        return OrderItemRequest
                .builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProduct().getName())
                .productImage(orderItem.getProduct().getImage())
                .quantity(orderItem.getQuantity())
                .discount(orderItem.getProduct().getDiscount())
                .price(orderItem.getPrice())
                .size(orderItem.getSize())
                .priceAfterDiscount(orderItem.getPriceAfterDiscount())
                .userId(orderItem.getUserId())
                .deliveryAt(orderItem.getDeliveryAt())
                .build();
    }

    private OrderRequest mapToOrderDto(Order order) {
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("d'st' MMMM yyyy 'at' h:mm a", Locale.ENGLISH);

        String formattedCreatedAt = order.getCreatedAt().format(customFormatter);


        return OrderRequest.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .orderDate(order.getOrderDate())
                .deliveryDate(order.getDeliveryDate())
                .orderItems(order.getOrderItems().stream().map(this::mapToOrderItemDTO).collect(Collectors.toList())) // Set the list of mapped OrderItemRequests
                .addressShippingCity(order.getAddressShipping().getCity())
                .addressShippingState(order.getAddressShipping().getState())
                .addressShippingStreet(order.getAddressShipping().getStreet())
                .addressShippingZipCode(order.getAddressShipping().getZipCode())
                .totalPrice(order.getTotalPrice())
                .totalPriceDiscounted(order.getTotalPriceDiscounted())
                .priceAfterDiscount(order.getPriceAfterDiscount())
                .discount(order.getDiscount())
                .orderStatus(order.getOrderStatus().toString())
                .totalItems(order.getTotalItems())
                .createdAt(formattedCreatedAt)
                .build();
    }


}
