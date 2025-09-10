package com.example.backend.domain.matchRecord.converter;

import com.example.backend.domain.matchRecord.dto.response.StatisticResponseDto;
import com.example.backend.domain.matchRecord.entity.TeamResult;
import com.example.backend.domain.matchRecord.mapper.projection.StatisticRow;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class StatisticConverter {

    private static final double EPS = 1e-9;

    public StatisticResponseDto toDto(List<StatisticRow> rows) {

        if (rows == null || rows.isEmpty()) {
            return StatisticResponseDto.builder()
                    .winCount(0).lossCount(0).tieCount(0)
                    .mostVisitedStadium(null)
                    .bestWinRateStadium(null)
                    .build();
        }
        int winCount = 0;
        int lossCount = 0;
        int tieCount = 0;

        Map<String, long[]> byStadium = new HashMap<>();


        for (StatisticRow r : rows) {
            TeamResult result = r.getTeamResult();
            String stadium = r.getStadiumName();
            if (stadium == null || stadium.isBlank()) {
                stadium = "(미지정)";
            }

            if (result != null) {
                switch (result) {
                    case WIN  -> winCount++;
                    case LOSS -> lossCount++;
                    case TIE  -> tieCount++;
                }
            }

            long[] agg = byStadium.computeIfAbsent(stadium, k -> new long[2]);
            agg[0]++;
            if (result == TeamResult.WIN) agg[1]++;
        }

        long maxGames = byStadium.values().stream()
                .mapToLong(v -> v[0])
                .max().orElse(0);


        String mostVisited = byStadium.entrySet().stream()
                .filter(e -> e.getValue()[0] == maxGames && maxGames > 0)
                .map(Map.Entry::getKey)
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .reduce((a, b) -> a + ", " + b)
                .orElse(null);

        double bestRatio = byStadium.entrySet().stream()
                .filter(e -> e.getValue()[0] > 0)
                .mapToDouble(e -> (double) e.getValue()[1] / e.getValue()[0])
                .max().orElse(Double.NaN);

        String bestWinRate = byStadium.entrySet().stream()
                .filter(e-> e.getValue()[0] > 0)
                .filter(e -> Math.abs(((double) e.getValue()[1] / e.getValue()[0]) - bestRatio) < EPS)
                .map(Map.Entry::getKey)
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .reduce((a, b) -> a + ", " + b)
                .orElse(null);

        return StatisticResponseDto.builder()
                .winCount(winCount)
                .lossCount(lossCount)
                .tieCount(tieCount)
                .mostVisitedStadium(mostVisited)
                .bestWinRateStadium(bestWinRate)
                .build();

    }
}
