package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.request.LoginRequestDto;
import com.example.backend.domain.user.service.AuthService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshCookie,
            @RequestHeader(name = "X-Refresh-Token", required = false) String refreshHeader
    ) {
        return authService.refresh(refreshCookie, refreshHeader);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshCookie,
            @RequestHeader(name = "X-Refresh-Token", required = false) String refreshHeader
    ) {
        authService.logout(refreshCookie, refreshHeader);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(@RequestBody LoginRequestDto req) {
        var r = authService.login(req.getEmail(), req.getPassword());

        ResponseCookie cookie = ResponseCookie.from("refresh_token", r.refreshToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(r.refreshTtlMs() / 1000)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + r.accessToken())
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}