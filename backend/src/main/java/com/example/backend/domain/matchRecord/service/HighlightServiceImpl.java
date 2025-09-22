package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.matchRecord.dto.request.HighlightsRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {

    @Value("${YT_API_KEY}")
    private String ytKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String resolveYoutubeUrl(HighlightsRequestDto req) {
        final String q  = buildQuery(req);

        String after  = toRfc3339StartOfDayUtc(req.getDate());
        String before = toRfc3339StartOfNextDayUtc(req.getDate());

        var ub = UriComponentsBuilder
                .fromHttpUrl("https://www.googleapis.com/youtube/v3/search")
                .queryParam("part", "snippet")
                .queryParam("type", "video")
                .queryParam("maxResults", "5")
                .queryParam("regionCode", "KR")
                .queryParam("relevanceLanguage", "ko")
                .queryParam("publishedAfter", after)
                .queryParam("publishedBefore", before)
                .queryParam("q", q)
                .queryParam("key", ytKey);

        Map<?, ?> body = restTemplate.getForObject(ub.toUriString(), Map.class);
        String videoId = extractFirstVideoId(body);

        if (videoId != null && !videoId.isBlank()){
            return "https://www.youtube.com/watch?v=" + videoId;
        }

        return "https://www.youtube.com/results?search_query=" + URLEncoder.encode(q, StandardCharsets.UTF_8);
    }

    private String buildQuery(HighlightsRequestDto req) {
        String sport = req.getSport();
        String dateKo = String.format("%d년 %d월 %d일",
                req.getDate().getYear(),
                req.getDate().getMonthValue(),
                req.getDate().getDayOfMonth());

        String base = String.join(" ", dateKo, req.getTeam1(), req.getTeam2(), "하이라이트");

        if (sport == "baseball") {
            return base + "KBO 야구";
        } else if  (sport == "basketball") {
            return base + "KBL 농구";
        }

        return base;
    }

    private String toRfc3339StartOfDayUtc(LocalDate date) {
        ZoneId KST = ZoneId.of("Asia/Seoul");
        Instant instant = date.atStartOfDay(KST).toInstant();
        return DateTimeFormatter.ISO_INSTANT.format(instant);
    }

    private String toRfc3339StartOfNextDayUtc(LocalDate date) {
        ZoneId KST = ZoneId.of("Asia/Seoul");
        Instant instant = date.plusDays(1).atStartOfDay(KST).toInstant();
        return DateTimeFormatter.ISO_INSTANT.format(instant);
    }

    @SuppressWarnings("unchecked")
    private String extractFirstVideoId(Map<?, ?> body) {
        if(body == null) return null;
        Object itemObj = body.get("items");
        if(!(itemObj instanceof List)) return null;
        List<?> items = (List<?>) itemObj;
        if(items.isEmpty()) return null;

        Object first = items.get(0);
        if(!(first instanceof Map)) return null;
        Map<String, ?> firstMap = (Map<String, ?>) first;

        Object idOj = firstMap.get("id");
        if(!(idOj instanceof Map)) return null;
        Map<String, ?> idMap = (Map<String, ?>) idOj;

        Object vid = idMap.get("videoId");
        return (vid instanceof String) ? (String) vid: null;
    }

}
