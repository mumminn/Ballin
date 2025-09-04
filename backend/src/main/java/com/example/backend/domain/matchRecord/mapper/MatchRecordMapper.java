package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


@Mapper
public interface MatchRecordMapper {
//    List<MatchRecordEntity> findByCategoryId(@Param("categoryId") UUID categoryId);
     int insert (MatchRecordEntity e);
     List<MatchRecordResponseDto> findAllByUserId(@Param("userId") UUID userId);
     RecordDetailResponseDto getRecordDetailById(@Param("recordId") UUID recordId);
}
