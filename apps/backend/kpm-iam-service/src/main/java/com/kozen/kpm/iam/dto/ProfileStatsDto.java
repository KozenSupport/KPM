package com.kozen.kpm.iam.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "个人中心工作成果统计")
public record ProfileStatsDto(
        @Schema(description = "我创建的任务数量")
        long createdTasks,

        @Schema(description = "分配给我的任务数量")
        long assignedTasks,

        @Schema(description = "我已完成的任务数量")
        long completedTasks,

        @Schema(description = "我参与的任务数量")
        long participatedTasks,

        @Schema(description = "我对客户的外部留言/回复数量")
        long customerReplies,

        @Schema(description = "我发布或创建的知识库文章数量")
        long publishedKbArticles,

        @Schema(description = "我参与的项目数量")
        long projectCount,

        @Schema(description = "我服务或负责的客户数量")
        long customerCount
) {}
