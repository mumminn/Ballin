package com.example.backend.domain.matchRecord.controller;


import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.service.MatchRecordService;
import com.example.backend.global.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
