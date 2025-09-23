package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import com.example.backend.domain.matchRecord.entity.TeamResult;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Component
public class MatchRecordConverter {

    public static MatchRecordEntity toEntity(
            UUID recordId, UUID userId, UUID supportingTeamId,
            UUID opposingTeamId, UUID stadiumId, UUID categoryId,
            TeamResult teamResult, byte[] imageBytes,
            String imageContentType, String imageFileName, Long imageSize, MatchRecordRequestDto req
    ) {

        LocalDate localDate = req.getDate();
        Instant matchInstant = localDate.atStartOfDay(ZoneId.of("Asia/Seoul")).toInstant();

        return MatchRecordEntity.builder()
                .recordId(recordId != null ? recordId : UUID.randomUUID())
                .userId(userId)
                .supportingTeamId(supportingTeamId)
                .opposingTeamId(opposingTeamId)
                .stadiumId(stadiumId)
                .categoryId(categoryId)
                .teamResult(teamResult)
                .image(imageBytes)
                .imageContentType(imageContentType)
                .imageFileName(imageFileName)
                .imageSize(imageSize)
                .matchDate(matchInstant)
                .supportingTeamScore(req.getMyScore())
                .opposingTeamScore(req.getOpponentScore())
                .review(req.getReview())
                .seat(req.getSeat())
                .dh(req.getDh())
                .build();
    }
}
