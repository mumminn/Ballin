package com.example.backend.domain.matchRecord.mapper.projection;

import com.example.backend.domain.matchRecord.entity.TeamResult;
import lombok.Data;

import java.util.Date;

@Data
public class MatchRecordStampRow {
    private Date matchDate;
    private String cateName;
    private TeamResult teamResult;
    private String teamCode;
}
