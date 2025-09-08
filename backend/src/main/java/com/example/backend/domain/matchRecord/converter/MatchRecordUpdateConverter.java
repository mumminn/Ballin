package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import com.example.backend.domain.matchRecord.mapper.param.PutParam;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MatchRecordUpdateConverter {

    public PutParam toPutParam(
            UUID supportingTeamId,
            UUID opposingTeamId,
            UUID stadiumId,
            String date,
            Integer myScore,
            Integer opponentScore,
            String review,
            String seat,
            byte[] imageBytes,
            String imageContentType,
            String imageFileName,
            Long imageSize,
            TeamResult teamResult
    ) {

        return PutParam.builder()
                .supportingTeamId(supportingTeamId)
                .opposingTeamId(opposingTeamId)
                .stadiumId(stadiumId)
                .matchDate(date)
                .supportingTeamScore(myScore)
                .opposingTeamScore(opponentScore)
                .review(review)
                .seat(seat)
                .image(imageBytes)
                .imageContentType(imageContentType)
                .imageFileName(imageFileName)
                .imageSize(imageSize)
                .teamResult(teamResult)
                .build();
    }
}