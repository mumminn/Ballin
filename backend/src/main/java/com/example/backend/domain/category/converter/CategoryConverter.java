package com.example.backend.domain.category.converter;

import com.example.backend.domain.category.dto.response.CategoryResponseDto;
import com.example.backend.domain.category.entity.CategoryEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class CategoryConverter {

    public CategoryResponseDto.CategoryDto toDto (CategoryEntity entity){
        return CategoryResponseDto.CategoryDto.builder()
                .categoryId(entity.getCategoryId())
                .categoryName(entity.getCategoryName())
                .build();
    }

    public CategoryResponseDto toResponse(List<CategoryEntity> entites){
        List<CategoryResponseDto.CategoryDto> items =
                (entites == null) ? List.of() : entites.stream()
                        .map(this::toDto).
                        toList();

        return CategoryResponseDto.builder()
                .categories(items)
                .build();
    }

}
