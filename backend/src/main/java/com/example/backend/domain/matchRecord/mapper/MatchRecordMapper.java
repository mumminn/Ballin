package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import com.example.backend.domain.matchRecord.mapper.param.PutParam;
import com.example.backend.domain.matchRecord.mapper.projection.MatchImageRow;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Mapper
public interface MatchRecordMapper {
//    List<MatchRecordEntity> findByCategoryId(@Param("categoryId") UUID categoryId);
     int insert (MatchRecordEntity e);
     List<MatchRecordResponseDto> findAllByUserId(@Param("userId") UUID userId);
     RecordDetailResponseDto getRecordDetailById(@Param("recordId") UUID recordId);
     Optional<MatchImageRow> findImageById(@Param("recordId") UUID recordId);
     int deleteRecord(@Param("recordId") UUID recordId);
     int updateRecord(@Param("recordId") UUID recordId, @Param("p") PutParam p);
}
