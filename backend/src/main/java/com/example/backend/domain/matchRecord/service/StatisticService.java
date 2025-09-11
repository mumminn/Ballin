package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.StatisticRequestDto;
import com.example.backend.domain.matchRecord.dto.response.StatisticResponseDto;

public interface StatisticService {
    StatisticResponseDto getStatistic(StatisticRequestDto req);

}
