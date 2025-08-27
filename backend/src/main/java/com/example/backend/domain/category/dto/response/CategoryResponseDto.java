package com.example.backend.domain.category.dto.response;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDto {
    List<CategoryDto> categories;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryDto {
        private UUID categoryId;
        private String categoryName;
    }
}
