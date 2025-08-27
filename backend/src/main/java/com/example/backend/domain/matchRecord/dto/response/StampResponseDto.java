package com.example.backend.domain.matchRecord.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StampResponseDto {
    private List<StampItemDto> stamps;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StampItemDto {
        private String date;
        private String sport;
        private String result;
        private String team;
    }
}
