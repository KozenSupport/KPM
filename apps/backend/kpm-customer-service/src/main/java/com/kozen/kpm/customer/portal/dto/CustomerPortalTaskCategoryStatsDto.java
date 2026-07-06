package com.kozen.kpm.customer.portal.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "客户门户任务分类统计")
public record CustomerPortalTaskCategoryStatsDto(
        @Schema(description = "任务分类业务值") String category,
        @Schema(description = "中文名称") String categoryName,
        @Schema(description = "英文名称") String categoryNameEn,
        @Schema(description = "任务数量") long totalTasks
) {}
