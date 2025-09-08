package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
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
            String matchDate,
            String supportingTeamCode,
            String category
    ) {
        return MatchRecordResponseDto.builder()
                .recordId(recordId)
                .supportingTeam(supportingTeamName)
                .opposingTeam(opposingTeamName)
                .stadium(stadiumName)
                .teamResult(teamResult)
                .stadiumTeam(stadiumTeamName)
                .matchDate(matchDate)
                .supportingTeamCode(supportingTeamCode)
                .category(category)
                .build();
    }


    public RecordDetailResponseDto fromJoinedRecordDetailRow(
            String supportingTeam,
            String opposingTeam,
            String stadium,
            TeamResult teamResult,
            String stadiumTeam,
            String matchDate,
            String supportingTeamCode,
            String opposingTeamCode,
            Integer supportingTeamScore,
            Integer opposingTeamScore,
            String seat,
            String review
    ) {
        return RecordDetailResponseDto.builder()
                .supportingTeam(supportingTeam)
                .opposingTeam(opposingTeam)
                .stadium(stadium)
                .teamResult(teamResult)
                .stadiumTeam(stadiumTeam)
                .matchDate(matchDate)
                .supportingTeamCode(supportingTeamCode)
                .opposingTeamCode(opposingTeamCode)
                .supportingTeamScore(supportingTeamScore)
                .opposingTeamScore(opposingTeamScore)
                .seat(seat)
                .review(review)
                .build();
    }
}
