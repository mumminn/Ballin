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
        final String q = buildQuery(req);

        String[][] windows = new String[][] {
                { toRfc3339StartOfDayUtc(req.getDate()), toRfc3339StartOfNextDayUtc(req.getDate()) },
                { toRfc3339StartOfDayUtc(req.getDate().minusDays(1)), toRfc3339StartOfNextDayUtc(req.getDate()) },
                { toRfc3339StartOfDayUtc(req.getDate()), toRfc3339StartOfNextDayUtc(req.getDate().plusDays(1)) }
        };


        for (String[] w : windows) {
            String url = searchFirstWatchUrl(q, w[0], w[1], "date");
            if (url != null) return url;

            url = searchFirstWatchUrl(q, w[0], w[1], null);
            if (url != null) return url;
        }

        String url = searchFirstWatchUrl(q, null, null, "date");
        if (url != null) return url;

        url = searchFirstWatchUrl(q, null, null, null);
        if (url != null) return url;


        return "https://www.youtube.com/results?search_query=" +
                URLEncoder.encode(q, StandardCharsets.UTF_8);
    }

    // 실제 API 호출
    private String searchFirstWatchUrl(String q, String afterUtc, String beforeUtc, String order) {
        try {
            var ub = UriComponentsBuilder
                    .fromHttpUrl("https://www.googleapis.com/youtube/v3/search")
                    .queryParam("part", "id,snippet")
                    .queryParam("type", "video")
                    .queryParam("maxResults", 5)
                    .queryParam("regionCode", "KR")
                    .queryParam("relevanceLanguage", "ko")
                    .queryParam("q", q)
                    .queryParam("key", ytKey);

            if (afterUtc != null)  ub.queryParam("publishedAfter", afterUtc);
            if (beforeUtc != null) ub.queryParam("publishedBefore", beforeUtc);
            if (order != null)     ub.queryParam("order", order);

            Map<?, ?> body = restTemplate.getForObject(ub.toUriString(), Map.class);
            String videoId = extractFirstVideoId(body);
            System.out.println(body);
            return (videoId == null || videoId.isBlank())
                    ? null
                    : "https://www.youtube.com/watch?v=" + videoId;

        } catch (Exception ignore) {
            return null;
        }
    }

    private String buildQuery(HighlightsRequestDto req) {
        String sport = req.getSport();
        String dateKo = String.format("%d년 %d월 %d일",
                req.getDate().getYear(),
                req.getDate().getMonthValue(),
                req.getDate().getDayOfMonth());

        String base = String.join(" ", dateKo, req.getTeam1(), req.getTeam2(), "하이라이트");

        if ("baseball".equalsIgnoreCase(sport)) {
            return base + " KBO 야구";
        } else if ("basketball".equalsIgnoreCase(sport)) {
            return base + " KBL 농구";
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
        if (body == null) return null;
        Object itemsObj = body.get("items");
        if (!(itemsObj instanceof List<?> items)) return null;
        if (items.isEmpty()) return null;

        Object first = items.get(0);
        if (!(first instanceof Map<?,?> firstMap)) return null;

        Object idObj = firstMap.get("id");
        if (!(idObj instanceof Map<?,?> idMap)) return null;

        Object vid = idMap.get("videoId");
        return (vid instanceof String s) ? s : null;
    }
}