package com.example.backend.domain.team.mapper;

import com.example.backend.domain.team.entity.TeamEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
public interface TeamMapper {
    TeamEntity findById (@Param("teamId") UUID teamId);
    List<TeamEntity> findCrawlingNameByCategory(@Param("categoryName") String categoryName);
    Optional<UUID> findIdByCrawlingName (@Param("categoryName") String categoryName, @Param("crawlingName") String crawlingName);
}
