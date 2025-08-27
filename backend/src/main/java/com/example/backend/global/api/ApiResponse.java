package com.example.backend.global.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonPropertyOrder({"isSuccess", "code", "message", "result"})
public class ApiResponse<T> {

    @Getter(AccessLevel.NONE)
    private final boolean success;

    @JsonProperty("isSuccess")
    private boolean isSuccess() { return success; }

    private final String code;
    private final String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T result;

    // 데이터 없는 200
    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(
                ApiCode.COMMON200.isSuccess(),
                ApiCode.COMMON200.getCode(),
                ApiCode.COMMON200.getMessage(),
                null
        );
    }

    // 데이터 있는 200
    @SuppressWarnings("unChecked")
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(
                ApiCode.COMMON200.isSuccess(),
                ApiCode.COMMON200.getCode(),
                ApiCode.COMMON200.getMessage(),
               data
        );
    }

    @SuppressWarnings("unChecked")
    public static <T> ApiResponse<T> of(ApiCode code, String message, T data) {
        return new ApiResponse<>(code.isSuccess(), code.getCode(),
                (message != null ? message : code.getMessage()),
                data
        );
    }

    public static <T> ApiResponse<Void> error(ApiCode code) {
        return of(code, null, null);
    }

    public static <T> ApiResponse<Void> error(ApiCode code, String message) {
        return of(code, message, null);
    }


}
