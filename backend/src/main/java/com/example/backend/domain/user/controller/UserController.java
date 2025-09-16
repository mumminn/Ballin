package com.example.backend.domain.user.controller;

import com.example.backend.domain.user.dto.request.LoginRequestDto;
import com.example.backend.domain.user.dto.request.SignUpRequestDto;
import com.example.backend.domain.user.service.UserService;
import com.example.backend.global.api.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody SignUpRequestDto req) {
        userService.register(req);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

}
