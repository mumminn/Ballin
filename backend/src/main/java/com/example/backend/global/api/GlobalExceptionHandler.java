package com.example.backend.global.api;

import com.example.backend.global.exception.CustomException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice(basePackages = "com.example.backend")
public class GlobalExceptionHandler {

    // 도메인에서 던진 CustomException → 지정한 상태코드/코드/메시지로 응답
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Void>> handleCustom(CustomException ex, HttpServletRequest req) {
        log.warn("[{}] {} {} - {}", ex.getStatus().value(), req.getMethod(), req.getRequestURI(), ex.getMessage());
        return ResponseEntity
                .status(ex.getStatus())
                .body(ApiResponse.error(ex.getCode(), ex.getMessage()));
    }

    // 400 - @Valid 바인딩 에러
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        String msg = ex.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .findFirst()
                .orElse("잘못된 요청입니다.");
        log.warn("[400] {} {} - validation failed: {}", req.getMethod(), req.getRequestURI(), msg);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(ApiCode.COMMON400, msg));
    }

    // 404 - 리소스 없음
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(NoSuchElementException ex, HttpServletRequest req) {
        log.warn("[404] {} {} - {}", req.getMethod(), req.getRequestURI(), ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(ApiCode.COMMON404, "리소스를 찾을 수 없습니다."));
    }

    // 403 - 접근 거부
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleDenied(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.error(ApiCode.COMMON403, "권한이 없습니다."));
    }

    // 500 - 그 외 모든 예외
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleEtc(Exception ex, HttpServletRequest req) {
        log.error("[500] {} {} - Unhandled exception", req.getMethod(), req.getRequestURI(), ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(ApiCode.COMMON500, "서버 오류입니다."));
    }
}