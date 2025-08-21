package com.example.backend.global.auth;

import com.example.backend.global.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwt;
    private final RefreshTokenService refreshTokens;

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshCookie,
            @RequestHeader(name = "X-Refresh-Token", required = false) String refreshHeader
    ) {

        String refresh = (refreshCookie != null) ? refreshCookie : refreshHeader;

        if (refresh == null || !jwt.isValid(refresh)) {
            return ResponseEntity.status(401).build();
        }

        String userId = jwt.getSubject(refresh);

        if(!refreshTokens.matches(userId, refresh)) {
            return ResponseEntity.status(401).build();
        }

        String newAccess = jwt.createAccessToken(userId);
        String newRefresh = jwt.createRefreshToken(userId);

        long refreshTtl = jwt.getExpireAtMillis(newRefresh) - System.currentTimeMillis();

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefresh)
                .httpOnly(true).secure(false).path("/")
                .maxAge(refreshTtl / 1000).sameSite("Lax").build();

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccess)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshCookie,
            @RequestHeader(name = "X-Refresh-Token", required = false) String refreshHeader
    ) {
        String refresh = refreshCookie != null ? refreshCookie : refreshHeader;
        if (refresh != null && jwt.isValid(refresh)) {
            String userId = jwt.getSubject(refresh);
            refreshTokens.delete(userId);
        }
        // 쿠키 제거
        ResponseCookie clear = ResponseCookie.from("refresh_token", "")
                .path("/").maxAge(0).httpOnly(true).sameSite("Lax").build();
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, clear.toString())
                .build();
    }
}
