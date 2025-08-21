package com.example.backend.global.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final StringRedisTemplate redis;

    private String key(String userId) { return "rt:" + userId; }

    public void save(String userId, String refreshToken, long ttlMinutes) {
        redis.opsForValue().set(key(userId), refreshToken, Duration.ofMillis(ttlMinutes));
    }

    public String find(String userId) {
        return redis.opsForValue().get(key(userId));
    }

    public void delete(String userId) {
        redis.delete(key(userId));
    }

    public boolean matches(String userId, String refreshToken) {
        String saved = find(userId);
        return saved != null && refreshToken.equals(saved);
    }
}
