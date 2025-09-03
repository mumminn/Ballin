package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface MatchRecordService {
    UUID create(MatchRecordRequestDto req, MultipartFile image);
    List<MatchRecordResponseDto> getRecord();
}
