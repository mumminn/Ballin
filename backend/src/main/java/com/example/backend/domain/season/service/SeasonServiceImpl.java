package com.example.backend.domain.season.service;

import com.example.backend.domain.season.dto.response.SeasonResponseDto;
import com.example.backend.domain.season.mapper.SeasonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeasonServiceImpl implements SeasonService {

    private final SeasonMapper seasonMapper;

    @Override
    @Transactional(readOnly = true)
    public List<SeasonResponseDto> getSeason() {
        return seasonMapper.getSeason();

    }
}
