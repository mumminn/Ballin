package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.response.KakaoUserInfoResponseDto;
import com.example.backend.domain.user.entity.UserEntity;
import com.example.backend.domain.user.service.KakaoService;
import com.example.backend.domain.user.service.UserService;
import com.example.backend.global.JwtTokenProvider;
import com.example.backend.global.api.ApiCode;
import com.example.backend.global.api.ApiResponse;
import com.example.backend.global.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kakao")
public class KakaoLoginController {

    private final KakaoService kakaoService;
    private final JwtTokenProvider jwt;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @GetMapping("/callback")
    public ResponseEntity<ApiResponse<?>> callback(@RequestParam("code") String code) {
        try{
            String kakaoAccessToken = kakaoService.getAccessTokenFromKakao(code);
            KakaoUserInfoResponseDto info = kakaoService.getUserInfo(kakaoAccessToken);

            UserEntity user = userService.upsertFromKakao(info);

            String uid = user.getId().toString();
            String access = jwt.createAccessToken(uid);
            String refresh = jwt.createRefreshToken(uid);

            long refreshTtl = jwt.getExpireAtMillis(refresh) - System.currentTimeMillis();
            refreshTokenService.save(uid, refresh, refreshTtl);

            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refresh)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(refreshTtl / 1000)
                    .sameSite("Lax")
                    .build();


            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + access)
                    .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                    .body(ApiResponse.ok());

        } catch (RuntimeException e) {
            log.warn("Kakao login failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(ApiCode.COMMON400, e.getMessage()));
        } catch (Exception e) {
            log.error("Kakao login unexpected error", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error(ApiCode.COMMON500));
        }
    }
}