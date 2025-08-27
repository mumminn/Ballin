package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.response.StampResponseDto;

import java.util.UUID;

public interface StampService {
    StampResponseDto getStamps(UUID categoryIdNullable);
}
