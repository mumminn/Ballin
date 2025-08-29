package com.example.backend.domain.matchRecord.controller;

import com.example.backend.domain.matchRecord.dto.response.StampResponseDto;
import com.example.backend.domain.matchRecord.service.StampService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarController {

    private final StampService stampService;

    @GetMapping("/stamps")
    public ResponseEntity<ApiResponse<StampResponseDto>> getAllStamps() {
        StampResponseDto result = stampService.getStamps(null);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/stamps/{categoryId}")
    public ResponseEntity<ApiResponse<StampResponseDto>> getByCategory(@PathVariable("categoryId") UUID categoryId) {
        StampResponseDto result = stampService.getStamps(categoryId);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

}