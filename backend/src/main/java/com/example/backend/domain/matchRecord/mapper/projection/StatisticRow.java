package com.example.backend.domain.matchRecord.mapper.projection;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import lombok.Data;

@Data
public class StatisticRow {
    private TeamResult teamResult;
    private String stadiumId;
    private String stadiumName;
}
