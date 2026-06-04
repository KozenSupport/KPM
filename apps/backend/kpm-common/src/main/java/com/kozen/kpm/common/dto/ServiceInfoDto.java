package com.kozen.kpm.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "服务信息 DTO")
public record ServiceInfoDto(
        @Schema(description = "服务名") String service,
        @Schema(description = "状态") String status
) {
}
