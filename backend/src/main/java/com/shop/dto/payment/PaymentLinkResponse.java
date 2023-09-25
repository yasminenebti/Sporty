package com.shop.dto.payment;

import lombok.*;

@Getter
@Setter
@Builder
public class PaymentLinkResponse {
    private String paymentURL;
    private String paymentId;
}
