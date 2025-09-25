package com.example.backend.domain.team.converter;

import com.example.backend.domain.team.dto.response.TeamResponseDto;
import com.example.backend.domain.team.entity.TeamEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class TeamConverter {
    public TeamResponseDto toDto(String category, TeamEntity e) {
        if (e == null) return null;

        String teamName;

        if (category == "baseball") {
            teamName = e.getCrawlingName();
        } else teamName = e.getTeamName();

        return TeamResponseDto.builder()
                .teamId(e.getId())
                .teamName(teamName)
                .build();
    }

    public List<TeamResponseDto> toDtoList(String category, List<TeamEntity> entities) {
        if (entities == null || entities.isEmpty()) return List.of();
        return entities.stream()
                .filter(Objects::nonNull)
                .map(e -> toDto(category, e))
                .toList();
    }
}
