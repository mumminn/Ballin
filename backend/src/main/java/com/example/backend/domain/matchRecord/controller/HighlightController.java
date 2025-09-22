package com.example.backend.domain.matchRecord.controller;

import com.example.backend.domain.matchRecord.dto.request.HighlightsRequestDto;
import com.example.backend.domain.matchRecord.service.HighlightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/highlights")
@RequiredArgsConstructor
public class HighlightController {

    private final HighlightService highlightService;

    @PostMapping("/youtube")
    public ResponseEntity<Void> toFirstYoutube (@Valid @RequestBody HighlightsRequestDto req) {
        String url = highlightService.resolveYoutubeUrl(req);
        return ResponseEntity.status(302)
                .header("Location", url).build();
    }
}
