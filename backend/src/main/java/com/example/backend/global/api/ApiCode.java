package com.example.backend.global.api;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ApiCode {
    COMMON200(true,  "COMMON200", "성공입니다."),
    COMMON400(false, "COMMON400", "잘못된 요청입니다."),
    COMMON401(false, "COMMON401", "인증이 필요합니다."),
    COMMON403(false, "COMMON403", "권한이 없습니다."),
    COMMON404(false, "COMMON404", "대상을 찾을 수 없습니다."),
    COMMON409(false, "COMMON409", "이미 사용 중인 이메일입니다."),
    COMMON429(false, "COMMON429", "요청이 너무 많습니다."),
    COMMON500(false, "COMMON500", "서버 오류입니다.");

    private final boolean isSuccess;
    private final String code;
    private final String message;

    public boolean isSuccess() { return isSuccess; }
}
