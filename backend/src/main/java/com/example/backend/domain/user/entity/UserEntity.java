package com.example.backend.domain.user.entity;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {
    private UUID id;
    private String email;
    private String password;
    private String name;
    private SocialType socialType;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
    private UUID createdId;
    private UUID updatedId;

}
