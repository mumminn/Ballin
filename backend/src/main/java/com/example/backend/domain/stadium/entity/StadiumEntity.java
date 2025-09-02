package com.example.backend.domain.stadium.entity;

import com.example.backend.global.entity.BaseEntity;
import lombok.*;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class StadiumEntity extends BaseEntity {
    private UUID stadiumId;
    private UUID teamId;
    private UUID categoryId;
    private String stadiumName;
    private String location;
}
