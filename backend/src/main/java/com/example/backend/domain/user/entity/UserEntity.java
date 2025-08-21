package com.example.backend.domain.user.entity;

import com.example.backend.global.entity.BaseEntity;
import lombok.*;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends BaseEntity {
    private UUID id;
    private String email;
    private String password;
    private String name;
    private SocialType socialType;

}
