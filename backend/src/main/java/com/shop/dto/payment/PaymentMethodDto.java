package com.shop.dto.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentMethodDto {
    private String cardNumber;
    private String expMonth;
    private String expYear;
    private String cvc;
    private String email;
    private String priceId;
    private String username;
    private long numberOfLicense;
    private boolean success;


}
