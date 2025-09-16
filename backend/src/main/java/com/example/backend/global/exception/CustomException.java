package com.example.backend.global.exception;

import com.example.backend.global.api.ApiCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomException extends RuntimeException {
    private final HttpStatus status;
    private final ApiCode code;

    public CustomException(HttpStatus status, ApiCode code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() { return status; }
    public ApiCode getCode() { return code; }
}