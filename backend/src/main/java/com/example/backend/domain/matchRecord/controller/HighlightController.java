package com.example.backend.domain.matchRecord.controller;

import com.example.backend.domain.matchRecord.service.HighlightService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/highlights")
@RequiredArgsConstructor
public class HighlightController {

    private final HighlightService highlightService;

    @GetMapping("/{recordId}")
    public ResponseEntity<ApiResponse<Map<String, String>>> toFirstYoutube (@PathVariable("recordId") UUID recordId) {
        String url = highlightService.resolveYoutubeUrl(recordId);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("url", url)));
    }
}