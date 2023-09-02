package com.shop.controller;

import com.shop.dto.user.AuthRequest;
import com.shop.dto.user.AuthenticationResponse;
import com.shop.dto.user.RegisterRequest;
import com.shop.dto.user.UserRequest;
import com.shop.services.AuthService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/validateToken/{token}")
    public ResponseEntity<UserRequest> validateToken(@PathVariable String token){
        return ResponseEntity.ok(authService.validateToken(token));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthRequest request)
    {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @GetMapping("/validateAccount/{token}")
    public ResponseEntity<String> confirmUserAccount(@PathVariable String token){
        return ResponseEntity.ok(authService.validateUserAccount(token));
    }

    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }

    @PostMapping("/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request,response);

    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<UserRequest> updateProfile(
            @PathVariable Long id,
            @RequestBody UserRequest userRequest
    ) {
        return ResponseEntity.ok(authService.updateProfile(id, userRequest));
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long id,
            @RequestParam(required = true) String currentPassword,
            @RequestParam(required = true) String newPassword
    ) {
        authService.updatePassword(id, currentPassword, newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }



}
