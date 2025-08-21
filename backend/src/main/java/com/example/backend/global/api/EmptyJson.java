package com.example.backend.global.api;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Collections;
import java.util.Map;

public final class EmptyJson {
    public static final EmptyJson INSTANCE = new EmptyJson();
    private EmptyJson() {}

    @JsonValue
    public Map<String, Object> json() {
        return Collections.emptyMap();
    }
}