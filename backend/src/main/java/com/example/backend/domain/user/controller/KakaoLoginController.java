package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.KakaoUserInfoResponseDto;
import com.example.backend.domain.user.service.KakaoService;
import com.example.backend.domain.user.service.UserService;
import com.example.backend.global.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class KakaoLoginController {

    private final KakaoService kakaoService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @GetMapping("/callback")
    public ResponseEntity<AuthResponse> callback(@RequestParam("code") String code) {
        String kakaoAccessToken = kakaoService.getAccessTokenFromKakao(code);
        KakaoUserInfoResponseDto info = kakaoService.getUserInfo(kakaoAccessToken);

        var user = userService.upsertFromKakao(info);

        String accessJwt = jwtTokenProvider.createToken(user.getId().toString());
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessJwt)
                .body(new AuthResponse(accessJwt, info.getId()));
    }

    public record AuthResponse(String accessToken, Long kakaoUserId) {}
}