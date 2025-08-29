package com.example.backend.domain.team.converter;

import com.example.backend.domain.team.dto.response.TeamResponseDto;
import com.example.backend.domain.team.entity.TeamEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class TeamConverter {
    public TeamResponseDto toDto(TeamEntity e) {
        if (e == null) return null;

        return TeamResponseDto.builder()
                .teamId(e.getTeamId())
                .teamName(e.getCrawlingName())
                .build();
    }

    public List<TeamResponseDto> toDtoList(List<TeamEntity> entities) {
        if (entities == null || entities.isEmpty()) return List.of();
        return entities.stream()
                .filter(Objects::nonNull)
                .map(this::toDto)
                .toList();
    }
}
