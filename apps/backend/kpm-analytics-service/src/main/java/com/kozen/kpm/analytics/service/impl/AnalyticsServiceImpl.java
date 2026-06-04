package com.kozen.kpm.analytics.service.impl;

import com.kozen.kpm.analytics.config.GeocodingProperties;
import com.kozen.kpm.analytics.converter.AnalyticsConverter;
import com.kozen.kpm.analytics.dto.CustomerActivityDto;
import com.kozen.kpm.analytics.dto.DashboardStatsDto;
import com.kozen.kpm.analytics.dto.OrderStatsDto;
import com.kozen.kpm.analytics.dto.ResourceMapDto;
import com.kozen.kpm.analytics.dto.SupportStatsDto;
import com.kozen.kpm.analytics.entity.CustomerActivityRow;
import com.kozen.kpm.analytics.entity.ResourceMapRow;
import com.kozen.kpm.analytics.entity.ResourceMapRowWithGeo;
import com.kozen.kpm.analytics.mapper.AnalyticsMapper;
import com.kozen.kpm.analytics.service.AnalyticsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Default analytics read-service implementation. */
@Service
public class AnalyticsServiceImpl implements AnalyticsService {
    private final AnalyticsMapper analyticsMapper;
    private final AnalyticsConverter analyticsConverter;
    private final GeoCoordinateResolver geoCoordinateResolver;

    public AnalyticsServiceImpl(AnalyticsMapper analyticsMapper, AnalyticsConverter analyticsConverter, GeocodingProperties geocodingProperties) {
        this.analyticsMapper = analyticsMapper;
        this.analyticsConverter = analyticsConverter;
        this.geoCoordinateResolver = new GeoCoordinateResolver(analyticsMapper, geocodingProperties);
    }

    @Override
    public DashboardStatsDto dashboard() {
        return new DashboardStatsDto(
                analyticsMapper.projectCount(),
                analyticsMapper.activeProjectCount(),
                analyticsMapper.customerCount(),
                analyticsMapper.openTaskCount()
        );
    }

    @Override
    public List<OrderStatsDto> orderStats(String targetCurrency) {
        String normalizedTargetCurrency = analyticsConverter.normalizeTargetCurrency(targetCurrency);
        return analyticsMapper.orderStats().stream()
                .map(row -> analyticsConverter.toOrderStatsDto(row, normalizedTargetCurrency))
                .toList();
    }

    @Override
    @Transactional
    public List<ResourceMapDto> resourceMap() {
        return analyticsMapper.resourceMap().stream()
                .map(this::withGeoCoordinate)
                .map(analyticsConverter::toResourceMapDto)
                .toList();
    }

    private ResourceMapRowWithGeo withGeoCoordinate(ResourceMapRow row) {
        ResourceMapRowWithGeo result = copy(row);
        geoCoordinateResolver.resolve(row.getAddress(), row.getRegion()).ifPresentOrElse(point -> {
            result.setLatitude(point.latitude());
            result.setLongitude(point.longitude());
            result.setGeocodedAddress(point.displayName());
            result.setGeocodeProvider(point.provider());
            result.setGeoPrecision(point.precision());
            result.setGeocodeQuery(point.query());
        }, () -> {
            result.setGeocodeProvider("unresolved");
            result.setGeoPrecision("unresolved");
            result.setGeocodeQuery(firstText(row.getAddress(), row.getRegion()));
        });
        return result;
    }

    private ResourceMapRowWithGeo copy(ResourceMapRow source) {
        ResourceMapRowWithGeo target = new ResourceMapRowWithGeo();
        target.setCustomerId(source.getCustomerId());
        target.setCustomerName(source.getCustomerName());
        target.setRegion(source.getRegion());
        target.setAddress(source.getAddress());
        target.setLevel(source.getLevel());
        target.setStatus(source.getStatus());
        target.setSalesOwners(source.getSalesOwners());
        target.setSupportOwners(source.getSupportOwners());
        target.setProjects(source.getProjects());
        target.setOrderedQuantity(source.getOrderedQuantity());
        return target;
    }

    @Override
    public List<SupportStatsDto> support(String customerId) {
        String cid = customerId == null || customerId.isBlank() ? "" : customerId;
        return analyticsMapper.support(cid).stream()
                .map(analyticsConverter::toSupportStatsDto)
                .toList();
    }

    @Override
    public List<CustomerActivityDto> activity() {
        return analyticsMapper.activity().stream()
                .map(row -> analyticsConverter.toCustomerActivityDto(row, classify(row)))
                .toList();
    }

    private String classify(CustomerActivityRow row) {
        if ("已停用".equals(row.getStatus())) return "遗弃";
        if (row.getLastOrderDate() != null || defaultLong(row.getOpenTaskCount()) > 0) return "活跃";
        if (row.getLastFollowupAt() == null) return "停滞";
        return "观察";
    }

    private long defaultLong(Long value) {
        return value == null ? 0L : value;
    }

    private String firstText(String first, String second) {
        if (first != null && !first.isBlank()) return first;
        if (second != null && !second.isBlank()) return second;
        return "";
    }
}
