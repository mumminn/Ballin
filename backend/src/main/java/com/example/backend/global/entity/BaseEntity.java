package com.example.backend.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public abstract class BaseEntity {
    private Instant createdDt;
    private Instant updatedDt;
    private UUID createdId;
    private UUID updatedId;
}