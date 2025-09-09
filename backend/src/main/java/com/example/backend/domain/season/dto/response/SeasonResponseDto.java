package com.example.backend.domain.season.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeasonResponseDto {
    private String seasonName;
    private String category;

    private String startDate;
    private String endDate;
}
