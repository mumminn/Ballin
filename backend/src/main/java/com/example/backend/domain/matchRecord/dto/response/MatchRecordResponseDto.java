package com.example.backend.domain.matchRecord.dto.response;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchRecordResponseDto {
    private UUID recordId;
    private String supportingTeam;
    private String opposingTeam;
    private String stadium;
    private TeamResult teamResult;
    private String stadiumTeam;
    private String matchDate;
    private String supportingTeamCode;
}