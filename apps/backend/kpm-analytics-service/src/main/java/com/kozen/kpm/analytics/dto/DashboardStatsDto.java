package com.kozen.kpm.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "工作台统计 DTO")
public record DashboardStatsDto(
        @Schema(description = "项目总数") Integer projectCount,
        @Schema(description = "进行中项目数") Integer activeProjectCount,
        @Schema(description = "客户总数") Integer customerCount,
        @Schema(description = "未关闭任务数") Integer openTaskCount
) {
}
