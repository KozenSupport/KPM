package com.kozen.kpm.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "客户活跃度 DTO")
public record CustomerActivityDto(
        @Schema(description = "客户ID") String id,
        @Schema(description = "客户名称") String name,
        @Schema(description = "地区") String region,
        @Schema(description = "客户等级") String level,
        @Schema(description = "客户状态") String status,
        @Schema(description = "最近跟进时间") LocalDateTime lastFollowupAt,
        @Schema(description = "最近下单日期") LocalDate lastOrderDate,
        @Schema(description = "未关闭任务数") Long openTaskCount,
        @Schema(description = "关联项目数") Long projectCount,
        @Schema(description = "活跃状态Code", allowableValues = {"ACTIVE", "OBSERVING", "STALLED", "ABANDONED"}) String activityStatus
) {
}
