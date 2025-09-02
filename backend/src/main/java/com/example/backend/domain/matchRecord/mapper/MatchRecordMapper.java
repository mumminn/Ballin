package com.example.backend.domain.matchRecord.mapper;

import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MatchRecordMapper {
//    List<MatchRecordEntity> findByCategoryId(@Param("categoryId") UUID categoryId);
     int insert (MatchRecordEntity e);

}
