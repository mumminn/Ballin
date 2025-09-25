package com.example.backend.domain.team.entity;

import com.example.backend.global.entity.BaseEntity;
import lombok.*;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class TeamEntity extends BaseEntity {
    private UUID id;
    private UUID categoryId;
    private String teamCode;
    private String teamName;
    private String crawlingName;
}
