package com.example.backend.domain.category.mapper;

import com.example.backend.domain.category.dto.response.CategoryResponseDto;
import com.example.backend.domain.category.entity.CategoryEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
public interface CategoryMapper {
    Optional<CategoryEntity> findById (@Param("categoryId") UUID categoryId);
    List<CategoryEntity> findAllCategory();
}
