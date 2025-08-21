package com.example.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserInfoResponseDto {

    @JsonProperty("id")
    public Long id;

    @JsonProperty("connected_at")
    public Date connectedAt;

    //카카오 계정 정보
    @JsonProperty("kakao_account")
    public KakaoAccount kakaoAccount;


    @Getter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoAccount {

        private Profile profile;

        @JsonProperty("profile_nickname_needs_agreement")
        public Boolean profileNicknameNeedsAgreement;


        @Getter
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Profile {

            //닉네임
            @JsonProperty("nickname")
            public String nickName;

            //닉네임이 기본 닉네임인지 여부
            //true : 기본 닉네임, false : 사용자 등록
            @JsonProperty("is_default_nickname")
            public Boolean isDefaultNickName;

        }

    }
}

