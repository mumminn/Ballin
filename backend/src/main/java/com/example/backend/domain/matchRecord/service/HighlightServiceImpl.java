package com.example.backend.domain.matchRecord.service;

import com.example.backend.domain.category.mapper.CategoryMapper;
import com.example.backend.domain.matchRecord.entity.MatchRecordEntity;
import com.example.backend.domain.matchRecord.mapper.MatchRecordMapper;
import com.example.backend.domain.team.entity.TeamEntity;
import com.example.backend.domain.team.mapper.TeamMapper;
import com.example.backend.global.api.ApiCode;
import com.example.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {

    private final MatchRecordMapper matchRecordMapper;
    private final CategoryMapper categoryMapper;
    private final TeamMapper teamMapper;

    @Value("${youtube.api}")
    private String ytKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final ZoneId KST = ZoneId.of("Asia/Seoul");

    // Instant -> LocalDate
    private static LocalDate toKstDate(Instant instant) {
        return instant.atZone(KST).toLocalDate();
    }

    private static final List<String> TRUSTED_CHANNEL_IDS = List.of(
            "UC8JtQf77wqhVpOQ8Cze8JjA", // TVING SPORTS
            "UCoVz66yWHzVsXAFG8WhJK9g"  // KBO
    );

    @Override
    public String resolveYoutubeUrl(UUID recordId) {

        MatchRecordEntity mr = matchRecordMapper.getMatchRecordById(recordId);

        String category = Optional.ofNullable(categoryMapper.findById(mr.getCategoryId()))
                .orElse("");

        TeamEntity t1 = teamMapper.findById(mr.getSupportingTeamId());
        TeamEntity t2 = teamMapper.findById(mr.getOpposingTeamId());

        LocalDate d = toKstDate(mr.getMatchDate());

        final String q = buildQuery(d, category, t1, t2, mr.getDh());

        String[][] windows = new String[][] {
                { toRfc3339StartOfDayUtc(d), toRfc3339StartOfNextDayUtc(d) },
                { toRfc3339StartOfDayUtc(d.minusDays(1)), toRfc3339StartOfNextDayUtc(d) },
                { toRfc3339StartOfDayUtc(d), toRfc3339StartOfNextDayUtc(d.plusDays(1)) },
                { toRfc3339StartOfDayUtc(d), toRfc3339StartOfNextDayUtc(d.plusDays(7)) },
        };


        for (String channelId : TRUSTED_CHANNEL_IDS) {
            for (String[] w : windows) {
                // channelId 파라미터를 추가해서 검색
                String url = searchFirstWatchUrl(q, w[0], w[1], "date", channelId);
                if (url != null) return url;

                url = searchFirstWatchUrl(q, w[0], w[1], null, channelId);
                if (url != null) return url;
            }
        }


        throw new CustomException(
                HttpStatus.NOT_FOUND,
                ApiCode.COMMON404,
                "하이라이트 영상을 찾을 수 없습니다."
        );
    }

    // 실제 API 호출
    private String searchFirstWatchUrl(String q, String afterUtc, String beforeUtc, String order, String channelId) {
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
            if (channelId != null) ub.queryParam("channelId", channelId);



            java.net.URI uri = ub.build().toUri();
            System.out.println("YouTube API 요청 URL: " + uri);

            Map<?, ?> body = restTemplate.getForObject(uri, Map.class);

            String videoId = extractFirstVideoId(body);
            System.out.println("YouTube API 응답 본문: " + body);

            return (videoId == null || videoId.isBlank())
                    ? null
                    : "https://www.youtube.com/watch?v=" + videoId;

        } catch (Exception e) {
            System.err.println("YouTube API 호출 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private String buildQuery(LocalDate d, String category, TeamEntity t1, TeamEntity t2, String dh) {
        String dateKo = String.format("%d/%d", d.getMonthValue(), d.getDayOfMonth());

        String t1Name, t2Name;
        if (category == "baseball") {
            t1Name = (t1 != null && t1.getTeamName() != null) ? t1.getTeamName() : "";
            t2Name = (t2 != null && t2.getTeamName() != null) ? t2.getTeamName() : "";
        } else {
            t1Name = (t1 != null && t1.getCrawlingName() != null) ? t1.getCrawlingName() : "";
            t2Name = (t2 != null && t2.getCrawlingName() != null) ? t2.getCrawlingName() : "";
        }


        String league = switch (category == null ? "" : category.toLowerCase()) {
            case "baseball" -> "KBO 야구";
            case "basketball" -> "프로농구";
            default ->  "";
        };

        String dhToken = (dh != null && !dh.isBlank()) ? dh.trim() : "";

        return String.join(" ",
                dateKo,
                t1Name,
                t2Name,
                "하이라이트",
                league,
                dhToken
        ).replaceAll("\\s+", " ").trim();
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