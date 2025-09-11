package com.example.backend.domain.stadium.controller;

import com.example.backend.domain.stadium.service.StadiumService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/map")
public class StadiumController {

    private final StadiumService stadiumService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<String>>> getVisitedStadium (@RequestParam("category") String category) {
        List<String> result = stadiumService.getVisitedStadium(category);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
