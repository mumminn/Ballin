package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.mapper.projection.StatisticRow;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.UUID;

@Mapper
public interface StatisticMapper {
    List<StatisticRow> selectRowsForStatistic(
            @Param("userId") UUID userId, @Param("category") String category,
            @Param("startDate") String startDate, @Param("endDate") String endDate);
}
