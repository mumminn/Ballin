package com.example.backend.domain.matchRecord.dto.response;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDetailResponseDto {
    private String supportingTeam;
    private String opposingTeam;
    private String stadium;
    private TeamResult teamResult;
    private String stadiumTeam;
    private String matchDate;
    private String supportingTeamCode;
    private Integer supportingTeamScore;
    private Integer opposingTeamScore;
    private String seat;
    private String review;
}
