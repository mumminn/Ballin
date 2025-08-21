package com.example.backend.global;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

import java.util.Date;
import javax.crypto.SecretKey;



@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-minutes:30}")
    private long accessMinutes;

    @Value("${jwt.refresh-days:14}")
    private long refreshDays;

    private SecretKey key;


    @PostConstruct
    protected void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // accesstoken 생성
    public String createAccessToken(String userPK) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + accessMinutes * 60_000);
        return Jwts.builder()
                .subject(userPK)  // 사용자 pk 기록
                .issuedAt(now)    // 발급 시간
                .expiration(exp)  // 만료 시간
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    // refreshtoken 생성
    public String createRefreshToken(String userPK) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + refreshDays * 24 * 60 * 60_000L);
        return Jwts.builder()
                .subject(userPK)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    // 사용자 식별자 추출
    public String getSubject(String jwt) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(jwt)
                .getPayload()
                .getSubject();
    }

    // 토큰 유효성 검증
    public boolean isValid(String jwt) {
        try {
            Jwts.parser().verifyWith(key).build().parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 토큰 만료시간 조회
    public long getExpireAtMillis(String jwt) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(jwt)
                .getPayload()
                .getExpiration()
                .getTime();
    }
}