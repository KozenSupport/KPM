package com.kozen.kpm.common.mapper;

import com.kozen.kpm.common.jdbc.KpmRows;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

/**
 * Base mapper for pilot services using JdbcTemplate and map-shaped DTOs.
 * Later this can be replaced by MyBatis Plus or JPA without changing controllers.
 */
public abstract class JdbcMapMapper {
    protected final JdbcTemplate jdbc;

    protected JdbcMapMapper(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    protected List<Map<String, Object>> rows(String sql, Object... args) {
        return KpmRows.camelizeRows(jdbc.queryForList(sql, args));
    }

    protected Map<String, Object> row(String sql, Object... args) {
        return KpmRows.camelizeRow(jdbc.queryForMap(sql, args));
    }

    protected <T> List<T> column(String sql, Class<T> type, Object... args) {
        return jdbc.queryForList(sql, type, args);
    }

    protected int update(String sql, Object... args) {
        return jdbc.update(sql, args);
    }
}
