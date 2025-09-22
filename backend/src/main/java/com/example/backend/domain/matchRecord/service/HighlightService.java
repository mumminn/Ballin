package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.HighlightsRequestDto;

public interface HighlightService {
    String resolveYoutubeUrl (HighlightsRequestDto highlightsRequestDto);
}
