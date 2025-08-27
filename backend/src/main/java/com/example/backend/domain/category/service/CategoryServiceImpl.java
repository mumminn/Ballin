package com.example.backend.domain.category.service;

import com.example.backend.domain.category.converter.CategoryConverter;
import com.example.backend.domain.category.dto.response.CategoryResponseDto;
import com.example.backend.domain.category.entity.CategoryEntity;
import com.example.backend.domain.category.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryConverter categoryConverter;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponseDto getCategory (){
        List<CategoryEntity> entities = categoryMapper.findAllCategory();
        return categoryConverter.toResponse(entities);
    }

}
