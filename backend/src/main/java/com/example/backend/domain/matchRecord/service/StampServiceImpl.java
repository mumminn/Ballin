package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.converter.CalendarConverter;
import com.example.backend.domain.matchRecord.dto.response.StampResponseDto;
import com.example.backend.domain.matchRecord.mapper.MatchRecordMapper;
import com.example.backend.domain.matchRecord.mapper.MatchRecordStampMapper;
import com.example.backend.domain.matchRecord.mapper.projection.MatchRecordStampRow;
import com.example.backend.global.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StampServiceImpl implements StampService {

    private final MatchRecordStampMapper matchRecordStampMapper;
    private final CalendarConverter calendarConverter;

    @Override
    public StampResponseDto getStamps (UUID categoryId){

        UUID userId = AuthUser.idOrNull();

        List<MatchRecordStampRow> rows = (categoryId == null)
                ? matchRecordStampMapper.findStamps(null, userId)
                : matchRecordStampMapper.findStamps(categoryId, userId);

        return calendarConverter.toResponse(rows);
    }
}
