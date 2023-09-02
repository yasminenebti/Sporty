package com.shop.email;

import jakarta.mail.MessagingException;

public interface EmailSender {
    void sendEmail(String receiver,
                   String email,
                   String subject) throws MessagingException;
}
