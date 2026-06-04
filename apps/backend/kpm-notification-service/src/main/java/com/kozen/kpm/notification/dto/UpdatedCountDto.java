package com.kozen.kpm.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "更新数量 DTO")
public record UpdatedCountDto(@Schema(description = "更新数量") int updated) {
}
