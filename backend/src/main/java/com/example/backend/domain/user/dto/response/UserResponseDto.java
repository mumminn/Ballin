package com.example.backend.domain.user.dto.response;

import com.example.backend.domain.user.entity.SocialType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private String email;
    private String name;
    private SocialType socialType;
}
