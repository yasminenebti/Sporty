package com.shop.services;

import com.shop.dto.cart.CartRequest;
import com.shop.dto.user.AuthRequest;
import com.shop.dto.user.AuthenticationResponse;
import com.shop.dto.user.RegisterRequest;
import com.shop.dto.user.UserRequest;
import com.shop.email.EmailSender;
import com.shop.entity.cart.Cart;
import com.shop.entity.user.Role;
import com.shop.entity.user.User;
import com.shop.exception.UserException;
import com.shop.repository.UserRepository;
import com.shop.security.JwtService;
import com.shop.token.VerificationTokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailSender emailSender;
    private final VerificationTokenService verificationTokenService;
    private final AuthenticationManager authenticationManager;

    private CartService cartService; // Remove final

    @Autowired
    public void setCartService(@Lazy CartService cartService) {
        this.cartService = cartService;
    }



    //*****************Auth Part**********************
    public AuthenticationResponse register(RegisterRequest request) throws MessagingException, UserException {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .message("Email already exists")
                    .build();
        }
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return AuthenticationResponse.builder()
                    .message("Username already exists")
                    .build();
        }

        var user = User
                .builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(false)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        verificationTokenService.saveVerificationToken(jwtToken,user);
        String userToken = verificationTokenService.getToken(jwtToken);
        cartService.initiateCart(user.getId());

        String link = "http://localhost:7070/api/v1/auth/validateAccount/" + userToken;
        emailSender.sendEmail(request.getEmail(),createHtmlEmail(request.getFirstName() , link) , "Confirm your email");

        return AuthenticationResponse
                .builder()
                .message("user created successfully , you need to verify account")
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        verificationTokenService.revokeToken(user);
        verificationTokenService.saveVerificationToken(jwtToken,user);
        return AuthenticationResponse
                .builder()
                .message("Welcome back")
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    //*****************Account Part**********************

    public String validateUserAccount(String token) {
        User user = verificationTokenService.getUser(token);

        // Check if the user account is already validated
        if (user.isEnabled()) {
            return "Account already confirmed";
        }

        // Mark the account as validated and save the user
        user.setEnabled(true);
        userRepository.save(user);

        return "Account confirmed successfully";
    }

    public UserRequest validateToken(String token){
        if (jwtService.isTokenValid(token)){
            String username = jwtService.getUserName(token);
            User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("user not found"));
            return mapToUserDto(user);
        } throw new RuntimeException("Invalid Token");
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String userEmail;
        final String refreshToken ;


        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.getUserName(refreshToken);

        if (userEmail != null){
            User user = userRepository.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshToken) ) {
                var accessToken = jwtService.generateToken(user);
                verificationTokenService.revokeToken(user);
                verificationTokenService.saveVerificationToken(accessToken,user);
                var authResponse = AuthenticationResponse
                        .builder()
                        .token(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);

            }
        }
    }

    private String createHtmlEmail(String name, String link) {
        return "<html>" +
                "<head>" +
                "<style type=\"text/css\">" +
                "/* Your CSS code here */" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<p>Dear " + name + ",</p>" +
                "<p>Please click on the link below to verify your account:</p>" +
                "<a href='" + link + "'>Verify Account</a>" +
                "</body>" +
                "</html>";

    }


    //*******************User Part********************
    public UserRequest getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user =  userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            return mapToUserDto(user);
        }
        throw new IllegalStateException("No authenticated user found");
    }

    public User getUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            return user.get();
        }
        else throw new UserException("user don't exist");
    }

    public UserRequest updateProfile(Long id, UserRequest userRequest) {
        User userUpdate = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        /*if (!passwordEncoder.matches(currentPassword, userUpdate.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }*/

        if (userRequest.firstName() != null) {
            userUpdate.setFirstName(userRequest.firstName());
        }
        if (userRequest.lastName() != null) {
            userUpdate.setLastName(userRequest.lastName());
        }
        if (userRequest.email() != null) {
            if (userRepository.findByEmail(userRequest.email()).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }
            userUpdate.setEmail(userRequest.email());
        }
        if (userRequest.picture() != null) {
            userUpdate.setPicture(userRequest.picture());
        }

        userRepository.save(userUpdate);

        return mapToUserDto(userUpdate);
    }

    public void updatePassword(Long id, String currentPassword, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Check if the provided current password is correct
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }

        // Encode the new password and update the user's password in the database
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
    }

    private UserRequest mapToUserDto(User user) {
        return new UserRequest(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPicture(),
                user.isEnabled()
        );

    }


}