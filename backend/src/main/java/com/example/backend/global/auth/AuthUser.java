package com.example.backend.global.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.Method;
import java.util.UUID;

public final class AuthUser {

    private AuthUser() {}

    /** 인증 안 되어 있으면 null, 되어 있으면 UUID 리턴 */
    public static UUID idOrNull() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return null;

        Object p = auth.getPrincipal();
        if (p == null) return null;

        // 1) 필터에서 넣은 String userId
        if (p instanceof String s) {
            try { return UUID.fromString(s); } catch (Exception ignore) {}
        }

        // 2) 혹시 principal이 UUID로 들어온 경우
        if (p instanceof UUID u) return u;

        // 3) UserDetails라면 username을 UUID로 해석 시도
        if (p instanceof UserDetails ud) {
            try { return UUID.fromString(ud.getUsername()); } catch (Exception ignore) {}
        }

        // 4) 커스텀 Principal에 getId()가 있다면 시도 (String/UUID 둘 다 처리)
        try {
            Method m = p.getClass().getMethod("getId");
            Object v = m.invoke(p);
            if (v instanceof UUID u) return u;
            if (v instanceof String s) {
                try { return UUID.fromString(s); } catch (Exception ignore) {}
            }
        } catch (Exception ignore) {}

        return null;
    }

    /** 인증 필수. 없으면 401용 런타임 예외 던짐 */
    public static UUID idOrThrow() {
        UUID id = idOrNull();
        if (id == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }
        return id;
    }

    /** 인증 여부 */
    public static boolean isAuthenticated() {
        return idOrNull() != null;
    }

    /** 401 전용 예외 (컨트롤러 어드바이스에서 잡아 응답 포맷으로 내려도 됨) */
    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) { super(message); }
    }
}