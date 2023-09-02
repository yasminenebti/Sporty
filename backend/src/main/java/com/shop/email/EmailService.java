package com.shop.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender{

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String mailSender;

    @Override
    @Async
    public void sendEmail(String receiver, String email , String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
        mimeMessageHelper.setText(email , true);
        mimeMessageHelper.setTo(receiver);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setFrom(mailSender);
        javaMailSender.send(mimeMessage);
    }

}
