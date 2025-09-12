package com.example.backend.domain.user.service;

import com.example.backend.domain.user.dto.response.AuthNumberResponse;
import com.example.backend.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.backend.global.exception.CustomException;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthMailService {

    private static final long CODE_TTL_MS = 30 * 60 * 1000L;

    private final RedisUtil redisUtil;
    private final SendMailService sendMailService;
    private final RateLimitService rateLimitService;

    @Value("${email.id}")
    private String from;

    private final SecureRandom secureRandom = new SecureRandom();

    // 인증 코드 전송
    public AuthNumberResponse sendCodeEmail(String email) {
        if (!rateLimitService.allow(email)) {
            throw new CustomException(HttpStatus.TOO_MANY_REQUESTS, "Too many request.");
        }

        String code = generate6DigitCode();

        // 코드 저장
        redisUtil.saveAuthCode(email, code, CODE_TTL_MS);

        // 메일 발송
        String title = "[Ballin] 회원 가입 인증번호";
        String content = "<p>인증 번호는 <b>" + code + "</b> 입니다.</p><p>30분 내에 입력해주세요.</p>";
        sendMailService.sendMail(from, email, title, content);

        return new AuthNumberResponse(code);
    }

    // 인증 코드 검증
    public void verifyCode(String email, String inputCode) {
        String saved = redisUtil.getAuthCode(email);
        if (saved == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "인증번호가 만료되었거나, 존재하지 않습니다.");
        }
        if (!saved.equals(inputCode)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "인증번호가 일치하지 않습니다.");
        }

        // 사용 후 제거
        redisUtil.deleteAuthCode(email);
    }

    private String generate6DigitCode() {
        int n = secureRandom.nextInt(1_000_000);
        return String.format("%06d", n);
    }

}
