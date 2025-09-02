package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface MatchRecordService {
    UUID create(MatchRecordRequestDto req, MultipartFile image);
}
