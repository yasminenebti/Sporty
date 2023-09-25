package com.shop.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserRequest {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String picture;
    private String paymentId;
    private boolean enabled;

}
