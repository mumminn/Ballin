package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.entity.TeamResult;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MatchRecordResponseConverter {

    public MatchRecordResponseDto fromJoinedRow(
            UUID recordId,
            String supportingTeamName,
            String opposingTeamName,
            String stadiumName,
            TeamResult teamResult,
            String stadiumTeamName,
            String matchDate
    ) {
        return MatchRecordResponseDto.builder()
                .recordId(recordId)
                .supportingTeam(supportingTeamName)
                .opposingTeam(opposingTeamName)
                .stadium(stadiumName)
                .teamResult(teamResult)
                .stadiumTeam(stadiumTeamName)
                .matchDate(matchDate)
                .build();
    }}
