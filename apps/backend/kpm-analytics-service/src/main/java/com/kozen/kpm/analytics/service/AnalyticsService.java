package com.kozen.kpm.analytics.service;

import com.kozen.kpm.analytics.dto.CustomerActivityDto;
import com.kozen.kpm.analytics.dto.DashboardStatsDto;
import com.kozen.kpm.analytics.dto.OrderStatsDto;
import com.kozen.kpm.analytics.dto.ResourceMapDto;
import com.kozen.kpm.analytics.dto.SupportStatsDto;

import java.util.List;

/**
 * Analytics read service.
 * Responsible for dashboard, order statistics, resource distribution,
 * support workload and customer activity analysis.
 */
public interface AnalyticsService {
    /** Query dashboard overview numbers. */
    DashboardStatsDto dashboard();
    /** Query order statistics and convert amount into target currency. */
    List<OrderStatsDto> orderStats(String targetCurrency);
    /** Query customer/resource map data. */
    List<ResourceMapDto> resourceMap();
    /** Query technical support workload statistics. */
    List<SupportStatsDto> support(String customerId);
    /** Query customer activity status list. */
    List<CustomerActivityDto> activity();
}
