package com.example.backend.domain.matchRecord.mapper.param;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PutParam {
    private String  matchDate;
    private UUID supportingTeamId;
    private UUID opposingTeamId;
    private UUID stadiumId;
    private int supportingTeamScore;
    private int opposingTeamScore;
    private TeamResult teamResult;
    private String review;
    private String seat;

    private byte[] image;
    private String imageContentType;
    private String imageFileName;
    private Long imageSize;
}