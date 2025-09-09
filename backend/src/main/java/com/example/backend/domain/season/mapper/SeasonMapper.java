package com.example.backend.domain.season.mapper;

import com.example.backend.domain.season.dto.response.SeasonResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeasonMapper {
    List<SeasonResponseDto> getSeason();
}
