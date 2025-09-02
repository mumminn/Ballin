package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.mapper.projection.MatchRecordStampRow;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.UUID;

public interface MatchRecordStampMapper {
    List<MatchRecordStampRow> findStamps (@Param("categoryId") UUID categoryId, @Param("userId") UUID userId);
}
