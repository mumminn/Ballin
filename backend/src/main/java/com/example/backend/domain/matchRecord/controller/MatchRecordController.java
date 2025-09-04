package com.example.backend.domain.matchRecord.controller;


import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
import com.example.backend.domain.matchRecord.service.MatchRecordService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/record")
public class MatchRecordController {

    private final MatchRecordService matchRecordService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> createRecord(
            @RequestPart("request") MatchRecordRequestDto requestDto,
            @RequestPart(value = "image", required = false)MultipartFile image
    ) {
        matchRecordService.create(requestDto, image);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MatchRecordResponseDto>>> getRecord() {
        List<MatchRecordResponseDto> result = matchRecordService.getRecord();
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/{recordId}/detail")
    public ResponseEntity<ApiResponse<RecordDetailResponseDto>> getRecordDetail(@PathVariable("recordId") UUID recordId) {
        RecordDetailResponseDto result = matchRecordService.getRecordDetail(recordId);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/{recordId}/image")
    public ResponseEntity<byte[]> getRecordImage(@PathVariable UUID recordId) {
        return matchRecordService.getRecordImage(recordId);
    }
}

