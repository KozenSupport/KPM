package com.kozen.kpm.common.util;

/**
 * SQL parameter helpers.
 */
public final class SqlParamUtil {
    private SqlParamUtil() {
    }

    public static String blankIfAll(String value) {
        if (value == null || value.isBlank() || value.startsWith("全部")) {
            return "";
        }
        return value;
    }

    public static String likeOrBlank(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        return "%" + value + "%";
    }

    public static String stringOrNull(Object value) {
        if (value == null || String.valueOf(value).isBlank()) {
            return null;
        }
        return String.valueOf(value);
    }
}
