package com.shop.token;

import com.shop.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class VerificationTokenService {


    private final VerificationRepo verificationRepo;

    public void saveVerificationToken(String token , User user) {
        VerificationToken verificationToken = VerificationToken
                .builder()
                .user(user)
                .token(token)
                .createdAt(LocalDateTime.now())
                .revoked(false)
                .expired(false)
                .build();
        verificationRepo.save(verificationToken);
    }

    public String getToken(String token) {
        return verificationRepo.findByToken(token).orElseThrow().getToken();
    }

    public User getUser(String token) {
        Optional<VerificationToken> verificationTokenOpt = verificationRepo.findByToken(token);
        VerificationToken verificationToken = verificationTokenOpt.orElseThrow(() -> new IllegalArgumentException("Invalid token"));
        return verificationToken.getUser();
    }

    public void revokeToken(User user){
        var verificationTokens = verificationRepo.findValidTokenPerUser(user.getId());
        if(!verificationTokens.isEmpty()){
            verificationTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });
        }
        verificationRepo.saveAll(verificationTokens);

    }




}
