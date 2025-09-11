package com.example.backend.domain.stadium.service;

import com.example.backend.domain.stadium.mapper.StadiumMapper;
import com.example.backend.global.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class StadiumServiceImpl implements StadiumService {
    private final StadiumMapper stadiumMapper;

    @Override
    public List<String> getVisitedStadium(String category){

        UUID userId = AuthUser.idOrNull();

        return stadiumMapper.findVisitedStadium(userId,category);
    }
}
