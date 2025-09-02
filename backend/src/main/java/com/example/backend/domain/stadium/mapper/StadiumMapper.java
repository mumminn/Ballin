package com.example.backend.domain.stadium.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

@Mapper
public interface StadiumMapper {
    Optional<UUID> findIdByTeamId (@Param("teamId") UUID teamId);
}
