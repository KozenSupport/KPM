package com.kozen.kpm.iam.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "个人中心资料与统计")
public record ProfileDto(
        @Schema(description = "当前用户基础资料、部门、角色和权限")
        AuthenticatedUserDto user,

        @Schema(description = "个人工作成果统计")
        ProfileStatsDto stats
) {}
