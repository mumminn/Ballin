package com.example.backend.domain.season.controller;

import com.example.backend.domain.season.dto.response.SeasonResponseDto;
import com.example.backend.domain.season.service.SeasonService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistic")
public class SeasonController {

    private final SeasonService seasonService;

    @GetMapping("/season")
    public ResponseEntity<ApiResponse<List<SeasonResponseDto>>> getSeason() {
        List<SeasonResponseDto> result = seasonService.getSeason();
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
