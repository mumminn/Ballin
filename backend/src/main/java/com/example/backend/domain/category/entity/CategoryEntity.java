package com.example.backend.domain.category.entity;

import com.example.backend.global.entity.BaseEntity;
import lombok.*;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@EqualsAndHashCode(callSuper = true)
public class CategoryEntity extends BaseEntity {
    private UUID categoryId;
    private String categoryName;
}
