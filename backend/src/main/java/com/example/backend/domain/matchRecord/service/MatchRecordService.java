package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.dto.request.MatchRecordUpdateRequestDto;
import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface MatchRecordService {
    UUID create(MatchRecordRequestDto req, MultipartFile image);
    List<MatchRecordResponseDto> getRecord();
    RecordDetailResponseDto getRecordDetail(UUID recordId);
    ResponseEntity<byte[]> getRecordImage(UUID recordId);
    void delete(UUID recordId);
    void putUpdate(UUID recordId, MatchRecordUpdateRequestDto req, MultipartFile image);
}