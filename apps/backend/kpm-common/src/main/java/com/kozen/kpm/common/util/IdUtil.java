package com.kozen.kpm.common.util;

import java.util.concurrent.atomic.AtomicLong;

/**
 * ID generation helpers.
 *
 * <p>KPM keeps database primary keys as BIGINT technical identifiers. The API
 * still serializes IDs as strings so the frontend does not lose precision in
 * JavaScript and old components can continue to treat IDs opaquely.</p>
 */
public final class IdUtil {
    private static final long SEQUENCE_SIZE = 100_000L;
    private static final AtomicLong SEQUENCE = new AtomicLong(0);

    private IdUtil() {
    }

    public static String nanoId(String prefix) {
        return numericId();
    }

    public static String numericId() {
        long sequence = Math.floorMod(SEQUENCE.getAndIncrement(), SEQUENCE_SIZE);
        return Long.toString(System.currentTimeMillis() * SEQUENCE_SIZE + sequence);
    }

    public static String slug(String value, String fallback) {
        String base = String.valueOf(value == null ? fallback : value)
                .toLowerCase()
                .replaceAll("[^a-z0-9\\u4e00-\\u9fa5]+", "-")
                .replaceAll("^-|-$", "");
        return base.isBlank() ? fallback : base;
    }
}
