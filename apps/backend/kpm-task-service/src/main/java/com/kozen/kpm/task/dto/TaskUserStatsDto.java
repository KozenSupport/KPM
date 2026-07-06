package com.kozen.kpm.task.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "当前用户任务统计")
public record TaskUserStatsDto(
        @Schema(description = "用户相关任务总数")
        long total,

        @Schema(description = "正在进行且执行人为当前用户的任务数")
        long mine,

        @Schema(description = "正在进行、与当前用户相关但执行人为他人的任务数")
        long waiting,

        @Schema(description = "与当前用户相关且已完成的任务数")
        long completed,

        @Schema(description = "统计口径使用的用户ID")
        String userId
) {}
