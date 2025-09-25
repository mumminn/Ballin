package com.example.backend.domain.matchRecord.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchRecordRequestDto {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate date;
    private String category;
    private String stadium;
    public String seat;
    public String myTeam;
    public String opponentTeam;
    public Integer myScore;
    public Integer opponentScore;
    public String review;
    public String dh;
}
