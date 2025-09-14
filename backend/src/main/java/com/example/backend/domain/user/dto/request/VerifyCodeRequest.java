package com.example.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class VerifyCodeRequest {
    private String email;
    private String code;
}
