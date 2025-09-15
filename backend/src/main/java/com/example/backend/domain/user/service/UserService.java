package com.example.backend.domain.user.service;

import com.example.backend.domain.user.dto.request.LoginRequestDto;
import com.example.backend.domain.user.dto.request.SignUpRequestDto;
import com.example.backend.domain.user.dto.response.KakaoUserInfoResponseDto;
import com.example.backend.domain.user.mapper.UserMapper;
import com.example.backend.domain.user.entity.UserEntity;
import com.example.backend.domain.user.entity.SocialType;
import com.example.backend.global.api.ApiCode;
import com.example.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // 카카오 회원가입
    @Transactional
    public UserEntity upsertFromKakao(KakaoUserInfoResponseDto info) {
        String nickname = Optional.ofNullable(info.getKakaoAccount())
                .map(KakaoUserInfoResponseDto.KakaoAccount::getProfile)
                .map(p -> p.getNickName())
                .orElse("KakaoUser");

        // 이메일 동의 항목이 없는 경우 대비: 카카오 id로 가짜 이메일 생성(유니크 보장)
        String email = Optional.ofNullable(info.getKakaoAccount())
                .map(a -> {
                    try {
                        var emailField = a.getClass().getDeclaredField("email");
                        emailField.setAccessible(true);
                        return (String) emailField.get(a);
                    } catch (Exception ignored) { return null; }
                })
                .orElse("kakao_" + info.getId() + "@kakao.local");

        // 이메일 기준으로 존재 확인
        var existing = userMapper.findByEmail(email);
        if (existing.isPresent()) {
            UserEntity u = existing.get();
            u.setName(nickname);
            userMapper.updateUserBasic(u);
            return userMapper.findById(u.getId()).orElse(u);
        }

        // 신규 생성
        UserEntity u = UserEntity.builder()
                .id(UUID.randomUUID())
                .email(email)
                .password(null)
                .name(nickname)
                .socialType(SocialType.KAKAO)
                .build();
        userMapper.insertUser(u);
        return u;
    }

    // 로컬 회원가입
    @Transactional
    public void register(SignUpRequestDto req) {

        final String email = req.getEmail().trim().toLowerCase();

        userMapper.findByEmail(email).ifPresent(u -> {
            throw new CustomException(HttpStatus.BAD_REQUEST, ApiCode.COMMON404, "이미 사용 중인 이메일입니다.");
        });

        UserEntity u = new UserEntity();
        u.setId(UUID.randomUUID());
        u.setEmail(email);
        u.setName(req.getName().trim());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setSocialType(SocialType.LOCAL);

        userMapper.insertUser(u);
    }
}