package com.example.backend.domain.matchRecord.mapper.projection;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchImageRow {
    private byte[] image;
    private String imageContentType;
    private String imageFileName;
    private Long imageSize;
}
