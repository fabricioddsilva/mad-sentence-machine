package com.kaos.madsentencemachine.entities.dto;

import java.util.Map;

public record StoryDTO(
        String id,
        String text,
        Map<String, Long> rateCount
) {
}
