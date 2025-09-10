package com.example.backend.domain.matchRecord.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticResponseDto {
    private Integer winCount;
    private Integer lossCount;
    private Integer tieCount;
    private String mostVisitedStadium;
    private String bestWinRateStadium;
}
