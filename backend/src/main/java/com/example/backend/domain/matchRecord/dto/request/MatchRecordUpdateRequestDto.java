package com.example.backend.domain.matchRecord.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchRecordUpdateRequestDto {
    private String date;
    private String category;
    private String stadium;
    public String seat;
    public String myTeam;
    public String opponentTeam;
    public Integer myScore;
    public Integer opponentScore;
    public String review;
}
