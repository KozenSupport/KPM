package com.kozen.kpm.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "未读消息数量 DTO")
public record UnreadCountDto(@Schema(description = "未读数量") int count) {
}
