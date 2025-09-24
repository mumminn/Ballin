package com.example.backend.domain.matchRecord.controller;

import com.example.backend.domain.matchRecord.service.HighlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/highlights")
@RequiredArgsConstructor
public class HighlightController {

    private final HighlightService highlightService;

    @GetMapping("/{recordId}")
    public ResponseEntity<Void> toFirstYoutube (@PathVariable("recordId") UUID recordId) {
        String url = highlightService.resolveYoutubeUrl(recordId);
        return ResponseEntity.status(302)
                .header("Location", url).build();
    }
}