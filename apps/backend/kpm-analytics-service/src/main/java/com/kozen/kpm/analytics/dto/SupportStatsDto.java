package com.kozen.kpm.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "技术支持统计 DTO")
public record SupportStatsDto(
        @Schema(description = "客户ID") String customerId,
        @Schema(description = "客户名称") String customerName,
        @Schema(description = "技术支持人员") String supportOwner,
        @Schema(description = "进行中的需求任务数") Long openRequirementCount,
        @Schema(description = "进行中的 Bug 任务数") Long openBugCount,
        @Schema(description = "进行中的其他任务数") Long openOtherCount,
        @Schema(description = "卡点任务数") Long blockedCount
) {
}
