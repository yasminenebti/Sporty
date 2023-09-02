package com.shop.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationRepo extends JpaRepository<VerificationToken,Long> {
    Optional<VerificationToken> findByToken(String token);

    @Query("""
    select t from VerificationToken t inner join User u on t.user.id = u.id 
    where u.id = :userId and (t.expired = false or t.revoked= false)
    """)
    List<VerificationToken> findValidTokenPerUser(Long userId);
}
