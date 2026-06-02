package com.kozen.kpm.common.jdbc;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class KpmRows {
    private KpmRows() {
    }

    public static List<Map<String, Object>> camelizeRows(List<Map<String, Object>> rows) {
        return rows.stream().map(KpmRows::camelizeRow).toList();
    }

    public static Map<String, Object> camelizeRow(Map<String, Object> row) {
        Map<String, Object> result = new LinkedHashMap<>();
        row.forEach((key, value) -> result.put(toCamelCase(key), normalizeValue(value)));
        return result;
    }

    public static Object normalizeValue(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Timestamp timestamp) {
            return timestamp.toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        }
        if (value instanceof Date date) {
            return date.toLocalDate().toString();
        }
        if (value instanceof OffsetDateTime dateTime) {
            return dateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        }
        if (value instanceof BigDecimal decimal) {
            return decimal.stripTrailingZeros();
        }
        if ("org.postgresql.util.PGobject".equals(value.getClass().getName())) {
            try {
                return value.getClass().getMethod("getValue").invoke(value);
            } catch (ReflectiveOperationException ignored) {
                return value.toString();
            }
        }
        return value;
    }

    public static String toCamelCase(String value) {
        String lower = value.toLowerCase();
        StringBuilder builder = new StringBuilder();
        boolean upperNext = false;
        for (char ch : lower.toCharArray()) {
            if (ch == '_') {
                upperNext = true;
                continue;
            }
            builder.append(upperNext ? Character.toUpperCase(ch) : ch);
            upperNext = false;
        }
        return builder.toString();
    }
}
