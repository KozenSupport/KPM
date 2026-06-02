package com.kozen.kpm.analytics.service;

import java.util.List;
import java.util.Map;

/**
 * Analytics read service.
 * Responsible for dashboard, order statistics, resource distribution,
 * support workload and customer activity analysis.
 */
public interface AnalyticsService {
    /** Query dashboard overview numbers. */
    Map<String, Object> dashboard();
    /** Query order statistics and convert amount into target currency. */
    List<Map<String, Object>> orderStats(String targetCurrency);
    /** Query customer/resource map data. */
    List<Map<String, Object>> resourceMap();
    /** Query technical support workload statistics. */
    List<Map<String, Object>> support(String customerId);
    /** Query customer activity status list. */
    List<Map<String, Object>> activity();
}
