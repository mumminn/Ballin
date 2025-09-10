package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.converter.StatisticConverter;
import com.example.backend.domain.matchRecord.dto.request.StatisticRequestDto;
import com.example.backend.domain.matchRecord.dto.response.StatisticResponseDto;
import com.example.backend.domain.matchRecord.mapper.StatisticMapper;
import com.example.backend.domain.matchRecord.mapper.projection.StatisticRow;
import com.example.backend.global.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final StatisticMapper statisticMapper;
    private final StatisticConverter statisticConverter;

    @Override
    @Transactional
    public StatisticResponseDto getStatistic(StatisticRequestDto req) {

        UUID userId = AuthUser.idOrNull();

        if (userId == null) {
            throw new NoSuchElementException("User not authenticated");
        }

        List<StatisticRow> rows = statisticMapper.selectRowsForStatistic(
                userId, req.getCategory(), req.getStartDate(), req.getEndDate());

        return statisticConverter.toDto(rows);
    }
}
