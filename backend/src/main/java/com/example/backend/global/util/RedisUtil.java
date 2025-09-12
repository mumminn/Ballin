package com.example.backend.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, String> redisTemplate;

    public void saveAuthCode(String email, String code, long ttlMs) {
        String key = "auth:mail:" + email + ":code";
        redisTemplate.opsForValue().set(key, code, ttlMs, TimeUnit.MILLISECONDS);
    }

    public String getAuthCode(String email) {
        return redisTemplate.opsForValue().get("auth:mail:" + email + ":code");
    }

    public void deleteAuthCode(String email) {
        redisTemplate.delete("auth:mail:" + email + ":code");
    }

    public long increaseApiCall(String key, long ttlMs) {
        String k = "rl:mail:" + key;
        Long cnt = redisTemplate.opsForValue().increment(k);
        if (cnt != null && cnt == 1L) {
            redisTemplate.expire(k, ttlMs, TimeUnit.MILLISECONDS);
        }
        return cnt == null ? 0L : cnt;
    }
}
