package com.example.backend.domain.team.service;


import com.example.backend.domain.team.converter.TeamConverter;
import com.example.backend.domain.team.dto.response.TeamResponseDto;
import com.example.backend.domain.team.mapper.TeamMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamConverter teamConverter;

    @Override
    public List<TeamResponseDto> findByCategory (String categoryName) {
        var entities = teamMapper.findCrawlingNameByCategory(categoryName);
        return teamConverter.toDtoList(entities);
    }

}
