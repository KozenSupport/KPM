package com.kozen.kpm.common.observability;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Array;
import java.time.temporal.TemporalAccessor;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

/** Serializes log payloads safely and masks sensitive fields. */
@Component
public class KpmLogSanitizer {
    private static final String MASK = "******";
    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();
    private final KpmLoggingProperties properties;

    public KpmLogSanitizer(KpmLoggingProperties properties) {
        this.properties = properties;
    }

    public String safeArgs(Object[] args) {
        if (args == null || args.length == 0) return "[]";
        Object[] filtered = new Object[args.length];
        for (int i = 0; i < args.length; i += 1) {
            filtered[i] = safeValue(args[i]);
        }
        return safeJson(filtered);
    }

    public String safeResult(Object result) {
        return safeJson(safeValue(result));
    }

    @SuppressWarnings("unchecked")
    private Object safeValue(Object value) {
        if (value == null) return null;
        if (value instanceof ServletRequest || value instanceof ServletResponse) return value.getClass().getSimpleName();
        if (value instanceof MultipartFile file) return Map.of("fileName", file.getOriginalFilename(), "size", file.getSize());
        if (isPrimitiveLike(value)) return value;
        if (value.getClass().isArray()) {
            int length = Array.getLength(value);
            Object[] safe = new Object[length];
            for (int i = 0; i < length; i += 1) {
                safe[i] = safeValue(Array.get(value, i));
            }
            return safe;
        }
        if (value instanceof Map<?, ?> map) {
            Map<String, Object> safe = new LinkedHashMap<>();
            map.forEach((key, item) -> safe.put(String.valueOf(key), shouldMask(String.valueOf(key)) ? MASK : safeValue(item)));
            return safe;
        }
        if (value instanceof Iterable<?> iterable) {
            return iterable;
        }
        return value;
    }

    private boolean isPrimitiveLike(Object value) {
        return value instanceof CharSequence
                || value instanceof Number
                || value instanceof Boolean
                || value instanceof Enum<?>
                || value instanceof TemporalAccessor;
    }

    private String safeJson(Object value) {
        String text;
        try {
            JsonNode node = objectMapper.valueToTree(value);
            maskNode(node);
            text = objectMapper.writeValueAsString(node);
        } catch (JsonProcessingException | IllegalArgumentException e) {
            text = fallbackText(value);
        }
        int max = Math.max(200, properties.getMaxPayloadLength());
        if (text.length() <= max) return text;
        return text.substring(0, max) + "...(truncated)";
    }

    private String fallbackText(Object value) {
        if (value == null) return "null";
        if (isPrimitiveLike(value)) {
            return String.valueOf(value);
        }
        return "<" + value.getClass().getSimpleName() + ":serialization-failed>";
    }

    private boolean shouldMask(String key) {
        String normalized = key == null ? "" : key.toLowerCase(Locale.ROOT);
        return normalized.contains("password")
                || normalized.contains("secret")
                || normalized.contains("token")
                || normalized.contains("authorization")
                || normalized.contains("accesskey")
                || normalized.contains("access-key")
                || normalized.equals("code");
    }

    private void maskNode(JsonNode node) {
        if (node instanceof ObjectNode objectNode) {
            objectNode.fieldNames().forEachRemaining(field -> {
                if (shouldMask(field)) {
                    objectNode.put(field, MASK);
                } else {
                    maskNode(objectNode.get(field));
                }
            });
            return;
        }
        if (node instanceof ArrayNode arrayNode) {
            arrayNode.forEach(this::maskNode);
        }
    }
}
