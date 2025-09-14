package com.example.backend.domain.user.service;

import com.example.backend.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RateLimitService {

    private static final int MAX_API_CALL = 10;
    private static final long WINDOW_MS  = 30 * 60 * 1000L; // 30분
    private final RedisUtil redisUtil;

    public boolean allow(String key) {
        long cnt = redisUtil.increaseApiCall(key, WINDOW_MS);
        return cnt <= MAX_API_CALL;
    }
}