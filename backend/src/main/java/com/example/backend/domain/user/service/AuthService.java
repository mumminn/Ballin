package com.example.backend.domain.user.service;

import com.example.backend.domain.user.mapper.UserMapper;
import com.example.backend.global.JwtTokenProvider;
import com.example.backend.global.api.ApiCode;
import com.example.backend.global.api.ApiResponse;
import com.example.backend.global.auth.RefreshTokenService;
import com.example.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwt;
    private final RefreshTokenService refreshTokens;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    private String stripBearer(String header) {
        if (header == null) return null;
        return header.startsWith("Bearer ") ? header.substring(7) : header;
    }

    // 리프레시: 검증 -> 새 토큰 발급 -> 저장소/쿠키 갱신 -> 헤더/쿠키 반환
    public ResponseEntity<Void> refresh(String refreshCookie, String refreshHeader) {
        String refresh = (refreshCookie != null) ? refreshCookie : refreshHeader;
        if (refresh == null || !jwt.isValid(refresh)) {
            return ResponseEntity.status(401).build();
        }

        String userId = jwt.getSubject(refresh);
        if (!refreshTokens.matches(userId, refresh)) {
            return ResponseEntity.status(401).build();
        }

        String newAccess  = jwt.createAccessToken(userId);
        String newRefresh = jwt.createRefreshToken(userId);

        // 새로운 리프레시 토큰 만료시간 계산
        long refreshTtl = Math.max(0L, jwt.getExpireAtMillis(newRefresh) - System.currentTimeMillis());
        refreshTokens.save(userId, newRefresh, refreshTtl);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefresh)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(refreshTtl / 1000)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccess)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

    // 로그아웃: 서버 저장소 토큰 제거 -> 쿠키 무효화
    public ResponseEntity<ApiResponse<Void>> logout(String refreshCookie, String refreshHeader) {
        String refresh = (refreshCookie != null) ? refreshCookie : stripBearer(refreshHeader);
        if (refresh != null && jwt.isValid(refresh)) {
            String userId = jwt.getSubject(refresh);

            refreshTokens.delete(userId);
        }

        ResponseCookie clear = ResponseCookie.from("refresh_token", "")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .sameSite("Lax")
                .build();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, clear.toString())
                .build();
    }

    // 로그인: 이메일, 비밀번호 조회 -> 토큰 발급 및 저장
    public LoginResult login(String email, String rawPassword) {
        var user = userMapper.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new CustomException(HttpStatus.UNAUTHORIZED, ApiCode.COMMON401, "존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, ApiCode.COMMON401, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        String userId = user.getId().toString();
        String access = jwt.createAccessToken(userId);
        String refresh = jwt.createRefreshToken(userId);

        long refreshTtl = jwt.getExpireAtMillis(refresh) - System.currentTimeMillis();
        refreshTokens.save(userId, refresh, refreshTtl);

        return new LoginResult(access, refresh, refreshTtl);
    }

    public record LoginResult(String accessToken, String refreshToken, long refreshTtlMs) {}

}