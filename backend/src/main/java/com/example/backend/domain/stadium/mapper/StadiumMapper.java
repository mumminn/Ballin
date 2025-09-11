package com.example.backend.domain.stadium.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
public interface StadiumMapper {
    Optional<UUID> findIdByTeamId (@Param("teamId") UUID teamId);
    List<String> findVisitedStadium (@Param("userId") UUID userId, @Param("category")String category);
}
