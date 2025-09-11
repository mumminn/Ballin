package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.category.mapper.CategoryMapper;
import com.example.backend.domain.matchRecord.converter.MatchRecordConverter;
import com.example.backend.domain.matchRecord.converter.MatchRecordResponseConverter;
import com.example.backend.domain.matchRecord.converter.MatchRecordUpdateConverter;
import com.example.backend.domain.matchRecord.dto.request.MatchRecordRequestDto;
import com.example.backend.domain.matchRecord.dto.request.MatchRecordUpdateRequestDto;
import com.example.backend.domain.matchRecord.dto.response.MatchRecordResponseDto;
import com.example.backend.domain.matchRecord.dto.response.RecordDetailResponseDto;
import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import com.example.backend.domain.matchRecord.entity.TeamResult;
import com.example.backend.domain.matchRecord.mapper.MatchRecordMapper;
import com.example.backend.domain.matchRecord.mapper.param.PutParam;
import com.example.backend.domain.stadium.mapper.StadiumMapper;
import com.example.backend.domain.team.mapper.TeamMapper;
import com.example.backend.global.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchRecordServiceImpl implements MatchRecordService {

    private final MatchRecordMapper matchRecordMapper;
    private final MatchRecordConverter matchRecordConverter;
    private final TeamMapper teamMapper;
    private final StadiumMapper stadiumMapper;
    private final CategoryMapper categoryMapper;
    private final MatchRecordResponseConverter matchRecordResponseConverter;
    private final MatchRecordUpdateConverter matchRecordUpdateConverter;

    @Transactional
    @Override
    public UUID create(MatchRecordRequestDto req, MultipartFile image) {

        TeamResult teamResult;

        UUID userId = AuthUser.idOrNull();
        if (userId == null) {
            throw new NoSuchElementException("User not authenticated");
        }

        UUID supportingTeamId = teamMapper.findIdByCrawlingName(req.getCategory(), req.getMyTeam())
                .orElseThrow(() -> new NoSuchElementException(
                        "응원팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getMyTeam()));

        UUID opposingTeamId = teamMapper.findIdByCrawlingName(req.getCategory(), req.getOpponentTeam())
                .orElseThrow(() -> new NoSuchElementException(
                        "상대팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getOpponentTeam()));

        UUID stadiumTeam = teamMapper.findIdByCrawlingName(req.getCategory(), req.getStadium())
                .orElseThrow(() -> new NoSuchElementException(
                        "경기장 매핑용 팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getStadium()));

        UUID stadiumId = stadiumMapper.findIdByTeamId(stadiumTeam)
                .orElseThrow(() -> new NoSuchElementException("Stadium not found: " + stadiumTeam));

        UUID categoryId = categoryMapper.findIdByCategoryName(req.getCategory())
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + req.getCategory()));

        if (req.getMyScore() > req.getOpponentScore()) {
            teamResult = TeamResult.WIN;
        } else if (req.getOpponentScore() > req.getMyScore()) {
            teamResult = TeamResult.LOSS;
        } else if (req.getMyScore() == req.getOpponentScore()) {
            teamResult = TeamResult.TIE;
        } else {
            teamResult = TeamResult.NOGAME;
        }


        byte[] imageBytes = null;
        String imageContentType = null;
        String imageFileName = null;
        Long imageSize = null;

        try {
            if (image != null && !image.isEmpty()) {
                imageBytes = image.getBytes();
                imageContentType = image.getContentType();
                imageFileName = image.getOriginalFilename();
                imageSize = image.getSize();
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("이미지 처리 실패", e);
        }


        MatchRecordEntity entity = matchRecordConverter.toEntity(
                null,
                userId,
                supportingTeamId,
                opposingTeamId,
                stadiumId,
                categoryId,
                teamResult,
                imageBytes,
                imageContentType,
                imageFileName,
                imageSize,
                req
        );

        matchRecordMapper.insert(entity);

        return entity.getRecordId();

    }


    @Override
    public List<MatchRecordResponseDto> getRecord() {

        UUID userId = AuthUser.idOrNull();
        if (userId == null) {
            throw new NoSuchElementException("User not authenticated");
        }

        return matchRecordMapper.findAllByUserId(userId).stream()
                .map(row -> matchRecordResponseConverter.fromJoinedRow(
                        row.getRecordId(),
                        row.getSupportingTeam(),
                        row.getOpposingTeam(),
                        row.getStadium(),
                        row.getTeamResult(),
                        row.getStadiumTeam(),
                        row.getMatchDate(),
                        row.getSupportingTeamCode(),
                        row.getCategory()
                ))
                .toList();
    }

    @Override
    public RecordDetailResponseDto getRecordDetail(UUID recordId) {
        var row = matchRecordMapper.getRecordDetailById(recordId);
        return matchRecordResponseConverter.fromJoinedRecordDetailRow(
                row.getSupportingTeam(),
                row.getOpposingTeam(),
                row.getStadium(),
                row.getTeamResult(),
                row.getStadiumTeam(),
                row.getMatchDate(),
                row.getSupportingTeamCode(),
                row.getOpposingTeamCode(),
                row.getSupportingTeamScore(),
                row.getOpposingTeamScore(),
                row.getSeat(),
                row.getReview()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> getRecordImage(UUID recordId) {
        var row = matchRecordMapper.findImageById(recordId)
                .orElseThrow(() -> new NoSuchElementException("record not found"));

        byte[] data = row.getImage();
        if (data == null || data.length == 0) {
            throw new NoSuchElementException("image not found");
        }

        String contentType = (row.getImageContentType() != null && !row.getImageContentType().isBlank())
                ? row.getImageContentType()
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        var headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType));
        headers.setContentLength(data.length);
        var disposition = ContentDisposition.inline()
                .filename(row.getImageFileName() != null ? row.getImageFileName() : "image")
                .build();
        headers.setContentDisposition(disposition);

        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }

    @Override
    public void delete(UUID recordId){
        int affected = matchRecordMapper.deleteRecord(recordId);
        if (affected == 0) {
            throw new NoSuchElementException("record not found" + recordId);
        }
    }

    @Override
    public void putUpdate(UUID recordId, MatchRecordUpdateRequestDto req, MultipartFile image) {

        TeamResult teamResult;

        UUID supportingTeamId = teamMapper.findIdByCrawlingName(req.getCategory(), req.getMyTeam())
                .orElseThrow(() -> new NoSuchElementException(
                        "응원팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getMyTeam()));

        UUID opposingTeamId = teamMapper.findIdByCrawlingName(req.getCategory(), req.getOpponentTeam())
                .orElseThrow(() -> new NoSuchElementException(
                        "상대팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getOpponentTeam()));

        UUID stadiumTeamId = teamMapper.findIdByCrawlingName(req.getCategory(), req.getStadium())
                .orElseThrow(() -> new NoSuchElementException(
                        "경기장 매핑용 팀을 찾을 수 없습니다. category=" + req.getCategory() + ", team=" + req.getStadium()));

        UUID stadiumId = stadiumMapper.findIdByTeamId(stadiumTeamId)
                .orElseThrow(() -> new NoSuchElementException("Stadium not found: " + stadiumTeamId));


        if (req.getMyScore() > req.getOpponentScore()) {
            teamResult = TeamResult.WIN;
        } else if (req.getOpponentScore() > req.getMyScore()) {
            teamResult = TeamResult.LOSS;
        } else if (req.getMyScore() == req.getOpponentScore()) {
            teamResult = TeamResult.TIE;
        } else {
            teamResult = TeamResult.NOGAME;
        }

        byte[] imageBytes = null;
        String contentType = null;
        String filename = null;
        Long size = null;

        if (image != null && !image.isEmpty()) {
            try {
                imageBytes = image.getBytes();
            } catch (IOException e) {
                throw new IllegalArgumentException("이미지 처리 실패", e);
            }
            contentType = Optional.ofNullable(image.getContentType()).orElse("application/octet-stream");
            filename = Optional.ofNullable(image.getOriginalFilename()).orElse("image");
            size = image.getSize();
        }

        PutParam p = matchRecordUpdateConverter.toPutParam(
                supportingTeamId,
                opposingTeamId,
                stadiumId,
                req.getDate(),
                req.getMyScore(),
                req.getOpponentScore(),
                req.getReview(),
                req.getSeat(),
                imageBytes,
                contentType,
                filename,
                size,
                teamResult
        );

        int updated = matchRecordMapper.updateRecord(recordId, p);
        if (updated != 1) {
            throw new IllegalStateException("수정 실패: updated=" + updated + ", recordId=" + recordId);
        }
    }
}
