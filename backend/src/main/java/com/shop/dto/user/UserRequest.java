package com.shop.dto.user;

public record UserRequest(
        Long id,
        String username,
        String firstName,
        String lastName,

        String email,
        String picture,
        boolean enabled
) {

}
