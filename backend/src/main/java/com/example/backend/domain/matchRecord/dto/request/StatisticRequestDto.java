package com.example.backend.domain.matchRecord.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatisticRequestDto {
    private String category;
    private String startDate;
    private String endDate;
}
