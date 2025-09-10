package com.example.backend.domain.matchRecord.controller;

import com.example.backend.domain.matchRecord.dto.request.StatisticRequestDto;
import com.example.backend.domain.matchRecord.dto.response.StatisticResponseDto;
import com.example.backend.domain.matchRecord.service.StatisticService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistic")
public class StatisticController {

    private final StatisticService statisticService;

    @PostMapping()
    public ResponseEntity<ApiResponse<StatisticResponseDto>> getStatistic(@RequestBody StatisticRequestDto req) {
        StatisticResponseDto data = statisticService.getStatistic(req);
        return ResponseEntity.ok(ApiResponse.ok(data));

    }
}
