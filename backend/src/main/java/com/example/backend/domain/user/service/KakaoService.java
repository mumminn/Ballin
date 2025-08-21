package com.example.backend.domain.user.service;

import com.example.backend.domain.user.dto.KakaoTokenResponseDto;
import com.example.backend.domain.user.dto.KakaoUserInfoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoService {

    private final WebClient webClient;

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.client-secret:}")
    private String clientSecret;

    public String getAccessTokenFromKakao(String code) {
        log.info("[KakaoToken] clientId={}..., redirectUri={}, code.len={}",
                clientId != null && clientId.length() > 6 ? clientId.substring(0, 6) : clientId,
                redirectUri, code != null ? code.length() : null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "authorization_code");
        form.add("client_id", clientId);
        form.add("redirect_uri", redirectUri);
        form.add("code", code);
        if (StringUtils.hasText(clientSecret)) {
            form.add("client_secret", clientSecret);
        }

        KakaoTokenResponseDto token = webClient.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(form))
                .exchangeToMono(res -> {
                    if (res.statusCode().is2xxSuccessful()) {
                        return res.bodyToMono(KakaoTokenResponseDto.class);
                    }
                    return res.bodyToMono(String.class).defaultIfEmpty("")
                            .flatMap(body -> {
                                log.error("[KakaoToken] status={}, body={}", res.statusCode(), body);
                                return Mono.error(new RuntimeException("KakaoToken: " + body));
                            });
                })
                .block();

        log.info("[Kakao Service] Access Token -> {}", token.getAccessToken());
        return token.getAccessToken();
    }

    public KakaoUserInfoResponseDto getUserInfo(String accessToken) {
        KakaoUserInfoResponseDto info = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .exchangeToMono(res -> {
                    if (res.statusCode().is2xxSuccessful()) {
                        return res.bodyToMono(KakaoUserInfoResponseDto.class);
                    }
                    return res.bodyToMono(String.class).defaultIfEmpty("")
                            .flatMap(body -> {
                                log.error("[KakaoUser] status={}, body={}", res.statusCode(), body);
                                return Mono.error(new RuntimeException("KakaoUser: " + body));
                            });
                })
                .block();

        String nickname = Optional.ofNullable(info)
                .map(KakaoUserInfoResponseDto::getKakaoAccount)
                .map(KakaoUserInfoResponseDto.KakaoAccount::getProfile)
                .map(p -> {
                    try {
                        Method m = p.getClass().getMethod("getNickname");
                        return (String) m.invoke(p);
                    } catch (Exception e1) {
                        try {
                            Method m2 = p.getClass().getMethod("getNickName");
                            return (String) m2.invoke(p);
                        } catch (Exception e2) {
                            return null;
                        }
                    }
                })
                .orElse(null);

        log.info("[Kakao Service] NickName -> {}", nickname);
        return info;
    }
}