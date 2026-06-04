package com.kozen.kpm.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

@Schema(description = "订单统计 DTO")
public record OrderStatsDto(
        @Schema(description = "统计周期，YYYY-MM") String period,
        @Schema(description = "项目名称") String projectName,
        @Schema(description = "客户名称") String customerName,
        @Schema(description = "地区") String region,
        @Schema(description = "订单原币种") String currency,
        @Schema(description = "原币种金额") BigDecimal amount,
        @Schema(description = "订单数量") Long orderCount,
        @Schema(description = "产品数量") Long productQuantity,
        @Schema(description = "目标币种") String targetCurrency,
        @Schema(description = "换算后金额") BigDecimal convertedAmount
) {
}
