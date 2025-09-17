package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.request.LoginRequestDto;
import com.example.backend.domain.user.dto.request.PasswordRequestDto;
import com.example.backend.domain.user.dto.request.SignUpRequestDto;
import com.example.backend.domain.user.dto.request.UserRequestDto;
import com.example.backend.domain.user.dto.response.UserResponseDto;
import com.example.backend.domain.user.service.UserService;
import com.example.backend.global.api.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody SignUpRequestDto req) {
        userService.register(req);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    // 회원 정보 조회
    @GetMapping
    public ResponseEntity<ApiResponse<UserResponseDto>> getUser() {
        UserResponseDto result = userService.getUser();
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // 회원 정보 수정
    @PatchMapping("/edit")
    public ResponseEntity<ApiResponse<Void>> patchAccount(@Valid @RequestBody UserRequestDto  req) {
        userService.patchAccount(req);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    // 비밀번호 변경
    @PostMapping("/edit/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestBody PasswordRequestDto req) {
        userService.changePassword(req);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }


}
