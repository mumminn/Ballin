package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.request.SendCodeRequest;
import com.example.backend.domain.user.dto.request.VerifyCodeRequest;
import com.example.backend.domain.user.dto.response.AuthNumberResponse;
import com.example.backend.domain.user.service.AuthMailService;
import com.example.backend.global.api.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/mail")
@RequiredArgsConstructor
public class AuthMailController {

    private final AuthMailService authMailService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<AuthNumberResponse>> send (@RequestBody @Valid SendCodeRequest sendCodeRequest) {
        AuthNumberResponse res = authMailService.sendCodeEmail(sendCodeRequest.getEmail());
        return ResponseEntity.ok(ApiResponse.ok(res));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Void>> verify (@RequestBody VerifyCodeRequest verifyCodeRequest) {
        authMailService.verifyCode(verifyCodeRequest.getEmail(), verifyCodeRequest.getCode());
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}
