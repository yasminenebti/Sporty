package com.shop.services;

import com.shop.dto.cart.CartRequest;
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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final AddressRepository addressRepository;
    private final CartService cartService;

    public OrderItem createOrderItem(OrderItem orderItem){
        return orderItemRepository.save(orderItem);
    }

    public Order createOrder(Address shipAddress) throws UserException, CartException {
        UserRequest currentUser = authService.getCurrentUser();
        User orderUser = authService.getUserById(currentUser.id());
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
        orderRepository.save(order);

        //.paymentdetails().setStatus("pending")

        for (OrderItem item : orderItems){
            item.setOrder(order);
            orderItemRepository.save(item);
        }
        return order;



    }

    public Order getOrderById(Long orderId) throws OrderException {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()){
            return order.get();
        }
        else throw new OrderException("Cart not found");
    }

    public Order placeOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.PLACED);
        //getPaymeDetais.setStatus.completed
        return order;
    }
    public Order confirmOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.CONFIRMED);

        return orderRepository.save(order);
    }
    public Order shipOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.SHIPPED);

        return orderRepository.save(order);
    }
    public Order deliverOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.DELIVERED);

        return orderRepository.save(order);
    }

    public Order cancelOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.CANCELED);

        return orderRepository.save(order);
    }

    public List<Order> historyOrders(Long userId){
        return orderRepository.getOrderByUser(userId);
    }
    public List<Order> allOrders(){
        return orderRepository.findAll();
    }

    public void deleteOrder(Long orderId) throws OrderException {
        Order order = getOrderById(orderId);

        orderRepository.deleteById(orderId);
    }
}
