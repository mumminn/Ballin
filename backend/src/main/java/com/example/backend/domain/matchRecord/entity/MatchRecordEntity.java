package com.example.backend.domain.matchRecord.entity;

import com.example.backend.global.entity.BaseEntity;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@EqualsAndHashCode(callSuper = true)
public class MatchRecordEntity extends BaseEntity {
    private UUID recordId;
    private UUID userId;
    private UUID supportingTeamId;
    private UUID opposingTeamId;
    private UUID stadiumId;
    private UUID categoryId;
    private Instant matchDate;
    private int supportingTeamScore;
    private int opposingTeamScore;
    private TeamResult teamResult;
    private String review;
    private byte[] image;
    private String seat;
    private String imageContentType;
    private String imageFileName;
    private Long imageSize;
    private String dh;
}
