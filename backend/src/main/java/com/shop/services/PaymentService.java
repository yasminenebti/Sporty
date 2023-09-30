package com.shop.services;

import com.shop.dto.order.OrderItemRequest;
import com.shop.dto.order.OrderRequest;
import com.shop.dto.payment.PaymentLinkResponse;
import com.shop.dto.payment.PaymentMethodDto;
import com.shop.dto.user.UserRequest;
import com.shop.entity.order.Order;
import com.shop.entity.user.User;
import com.shop.exception.OrderException;
import com.shop.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.PaymentLinkCreateParams;
import com.stripe.param.PaymentMethodCreateParams;
import com.stripe.param.ProductCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {
    @Value("${stripe.secretKey}")
    private String secretKey;

    @Value("${stripe.publicKey}")
    private String publicKey;

    private final OrderService orderService;
    private final AuthService authService;
    private final UserRepository userRepository;

    public PaymentLinkResponse createPayment(Long orderId) throws StripeException, OrderException {
        Stripe.apiKey = secretKey;
        UserRequest currentUser = authService.getCurrentUser();
        OrderRequest order = orderService.getOrderById(orderId);

        //create customer
        Map<String, Object> newCustomer = new HashMap<>();
        newCustomer.put("name", currentUser.getUsername());
        newCustomer.put("email", currentUser.getEmail());

        User payer = userRepository.findById(currentUser.getId()).orElseThrow();
        Customer customer = Customer.create(newCustomer);
        currentUser.setPaymentId(customer.getId());



        //create Price
        Map<String, Object> priceParams = new HashMap<>();
        priceParams.put("unit_amount", (int) (order.getTotalPriceDiscounted() * 100));
        priceParams.put("currency", "usd");
        priceParams.put("product", order.getId());
        Price price = Price.create(priceParams);


        //create PaymentLink Link
        String priceId = price.getId();

        PaymentLinkCreateParams params =
                PaymentLinkCreateParams.builder()
                        .addLineItem(
                                PaymentLinkCreateParams.LineItem.builder()
                                        .setPrice(priceId)
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setAfterCompletion(
                                PaymentLinkCreateParams.AfterCompletion.builder()
                                        .setType(PaymentLinkCreateParams.AfterCompletion.Type.REDIRECT)
                                        .setRedirect(
                                                PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
                                                        .setUrl("http://localhost:5173/account/order/"+orderId)
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();

        PaymentLink paymentLink = PaymentLink.create(params);



        return PaymentLinkResponse
                .builder()
                .paymentURL(paymentLink.getUrl())
                .paymentId(paymentLink.getId())
                .build();

    }

    

    //payer.setPaymentId(customer.getId());
    //userRepository.save(payer);

}
