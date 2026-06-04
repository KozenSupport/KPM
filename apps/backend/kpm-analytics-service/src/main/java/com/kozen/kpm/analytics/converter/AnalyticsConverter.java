package com.kozen.kpm.analytics.converter;

import com.kozen.kpm.analytics.dto.CustomerActivityDto;
import com.kozen.kpm.analytics.dto.OrderStatsDto;
import com.kozen.kpm.analytics.dto.ResourceMapDto;
import com.kozen.kpm.analytics.dto.SupportStatsDto;
import com.kozen.kpm.analytics.entity.CustomerActivityRow;
import com.kozen.kpm.analytics.entity.OrderStatsRow;
import com.kozen.kpm.analytics.entity.ResourceMapRowWithGeo;
import com.kozen.kpm.analytics.entity.SupportStatsRow;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class AnalyticsConverter {
    private static final BigDecimal EUR_TO_USD = BigDecimal.valueOf(1.08);
    private static final BigDecimal CNY_TO_USD = BigDecimal.valueOf(0.14);
    private static final BigDecimal USD_TO_CNY = BigDecimal.valueOf(7.2);

    public OrderStatsDto toOrderStatsDto(OrderStatsRow row, String targetCurrency) {
        BigDecimal amount = row.getAmount() == null ? BigDecimal.ZERO : row.getAmount();
        String currency = row.getCurrency() == null ? "USD" : row.getCurrency();
        BigDecimal usd = switch (currency) {
            case "EUR" -> amount.multiply(EUR_TO_USD);
            case "CNY" -> amount.multiply(CNY_TO_USD);
            default -> amount;
        };
        BigDecimal converted = "CNY".equalsIgnoreCase(targetCurrency) ? usd.multiply(USD_TO_CNY) : usd;
        return new OrderStatsDto(
                row.getPeriod(),
                row.getProjectName(),
                row.getCustomerName(),
                row.getRegion(),
                currency,
                amount,
                defaultLong(row.getOrderCount()),
                defaultLong(row.getProductQuantity()),
                normalizeTargetCurrency(targetCurrency),
                converted.setScale(2, RoundingMode.HALF_UP)
        );
    }

    public ResourceMapDto toResourceMapDto(ResourceMapRowWithGeo row) {
        return new ResourceMapDto(
                row.getCustomerId(), row.getCustomerName(), row.getRegion(), row.getAddress(), row.getLevel(), row.getStatus(),
                row.getSalesOwners(), row.getSupportOwners(), row.getProjects(), defaultLong(row.getOrderedQuantity()),
                row.getLatitude(), row.getLongitude(), row.getGeocodedAddress(), row.getGeocodeProvider(), row.getGeoPrecision(), row.getGeocodeQuery()
        );
    }

    public SupportStatsDto toSupportStatsDto(SupportStatsRow row) {
        return new SupportStatsDto(
                row.getCustomerId(), row.getCustomerName(), row.getSupportOwner(),
                defaultLong(row.getOpenRequirementCount()), defaultLong(row.getOpenBugCount()), defaultLong(row.getOpenOtherCount()), defaultLong(row.getBlockedCount())
        );
    }

    public CustomerActivityDto toCustomerActivityDto(CustomerActivityRow row, String activityStatus) {
        return new CustomerActivityDto(
                row.getId(), row.getName(), row.getRegion(), row.getLevel(), row.getStatus(),
                row.getLastFollowupAt(), row.getLastOrderDate(), defaultLong(row.getOpenTaskCount()), defaultLong(row.getProjectCount()), activityStatus
        );
    }

    public String normalizeTargetCurrency(String targetCurrency) {
        return "CNY".equalsIgnoreCase(targetCurrency) ? "CNY" : "USD";
    }

    private Long defaultLong(Long value) {
        return value == null ? 0L : value;
    }
}
