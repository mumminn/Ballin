package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.dto.response.StampResponseDto;
import com.example.backend.domain.matchRecord.mapper.projection.MatchRecordStampRow;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.List;

@Component
public class CalendarConverter {

    public StampResponseDto.StampItemDto toItem(MatchRecordStampRow row) {
        String date = row.getMatchDate().toInstant()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toLocalDate()
                .toString();

        return StampResponseDto.StampItemDto.builder()
                .date(date)
                .sport(row.getCateName())
                .team(row.getTeamCode())
                .result(row.getTeamResult().name())
                .build();
    }

    public StampResponseDto toResponse(List<MatchRecordStampRow> rows) {
        return StampResponseDto.builder()
                .stamps(rows.stream().map(this::toItem).toList())
                .build();
    }
}
