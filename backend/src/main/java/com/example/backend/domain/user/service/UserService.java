package com.example.backend.domain.user.service;

import com.example.backend.domain.user.dto.KakaoUserInfoResponseDto;
import com.example.backend.domain.user.mapper.UserMapper;
import com.example.backend.domain.user.entity.UserEntity;
import com.example.backend.domain.user.entity.SocialType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

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
            u.setUpdatedId(null); // 필요 시 설정
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
                .createdId(null)
                .updatedId(null)
                .build();
        userMapper.insertUser(u);
        return u;
    }

    public UserEntity getById(UUID id) {
        return userMapper.findById(id).orElseThrow();
    }
}