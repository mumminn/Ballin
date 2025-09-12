package com.example.backend.domain.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class SendCodeRequest {
    @NotBlank @Email
    private String email;
}
