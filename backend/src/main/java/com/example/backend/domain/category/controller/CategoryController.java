package com.example.backend.domain.category.controller;

import com.example.backend.domain.category.dto.response.CategoryResponseDto;
import com.example.backend.domain.category.service.CategoryService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<CategoryResponseDto>> getCategory() {
        CategoryResponseDto result = categoryService.getCategory();
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

}
