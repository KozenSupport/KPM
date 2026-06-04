package com.kozen.kpm.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "资源分布地图 DTO")
public record ResourceMapDto(
        @Schema(description = "客户ID") String customerId,
        @Schema(description = "客户名称") String customerName,
        @Schema(description = "地区") String region,
        @Schema(description = "地址") String address,
        @Schema(description = "客户等级") String level,
        @Schema(description = "客户状态") String status,
        @Schema(description = "负责销售") String salesOwners,
        @Schema(description = "负责技术支持") String supportOwners,
        @Schema(description = "关联项目") String projects,
        @Schema(description = "累计下单产品数") Long orderedQuantity,
        @Schema(description = "地图纬度") Double latitude,
        @Schema(description = "地图经度") Double longitude,
        @Schema(description = "地理编码展示地址") String geocodedAddress,
        @Schema(description = "地理编码来源") String geocodeProvider,
        @Schema(description = "地理编码精度") String geoPrecision,
        @Schema(description = "地理编码查询文本") String geocodeQuery
) {
}
