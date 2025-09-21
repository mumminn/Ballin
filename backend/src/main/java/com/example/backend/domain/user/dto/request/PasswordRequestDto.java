package com.example.backend.domain.user.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequestDto {
    private String currentPassword;
    private String newPassword;
}
