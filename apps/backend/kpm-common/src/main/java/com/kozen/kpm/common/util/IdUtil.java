package com.kozen.kpm.common.util;

/**
 * ID generation helpers used by pilot implementation before Snowflake/segment IDs are introduced.
 */
public final class IdUtil {
    private IdUtil() {
    }

    public static String nanoId(String prefix) {
        return prefix + "-" + Long.toString(System.nanoTime(), 36);
    }

    public static String slug(String value, String fallback) {
        String base = String.valueOf(value == null ? fallback : value)
                .toLowerCase()
                .replaceAll("[^a-z0-9\\u4e00-\\u9fa5]+", "-")
                .replaceAll("^-|-$", "");
        return base.isBlank() ? fallback : base;
    }
}
