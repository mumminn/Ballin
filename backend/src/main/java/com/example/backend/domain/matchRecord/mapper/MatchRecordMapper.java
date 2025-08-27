package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import com.example.backend.domain.matchRecord.mapper.projection.MatchRecordStampRow;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.UUID;

@Mapper
public interface MatchRecordMapper {
//    List<MatchRecordEntity> findByCategoryId(@Param("categoryId") UUID categoryId);
    List<MatchRecordStampRow> findStamps (@Param("categoryId") UUID categoryId, @Param("userId") UUID userId);

}
