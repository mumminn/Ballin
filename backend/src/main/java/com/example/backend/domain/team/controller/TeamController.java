package com.example.backend.domain.team.controller;

import com.example.backend.domain.team.dto.response.TeamResponseDto;
import com.example.backend.domain.team.service.TeamService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/record")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/{categoryName}/teams")
    public ResponseEntity<ApiResponse<List<TeamResponseDto>>> getTeamList(@PathVariable String categoryName){
        List<TeamResponseDto> teams = teamService.findByCategory(categoryName);
        return ResponseEntity.ok(ApiResponse.ok(teams));
    }
}
