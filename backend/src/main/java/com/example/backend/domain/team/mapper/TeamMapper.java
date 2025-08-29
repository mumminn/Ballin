package com.example.backend.domain.team.mapper;

import com.example.backend.domain.team.dto.response.TeamResponseDto;
import com.example.backend.domain.team.entity.TeamEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
public interface TeamMapper {
    Optional<TeamEntity> findById (@Param("teamId") UUID teamId);
    List<TeamEntity> findCrawlingNameByCategory(@Param("categoryName") String categoryName);
}
