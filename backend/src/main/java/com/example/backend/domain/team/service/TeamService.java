package com.example.backend.domain.team.service;

import com.example.backend.domain.team.dto.response.TeamResponseDto;

import java.util.List;

public interface TeamService {
    List<TeamResponseDto> findByCategory (String categoryName);

}
