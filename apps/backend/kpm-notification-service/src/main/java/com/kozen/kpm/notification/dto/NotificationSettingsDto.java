package com.kozen.kpm.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "消息通知配置 DTO")
public record NotificationSettingsDto(
        @Schema(description = "前端建议刷新间隔，单位秒") long refreshIntervalSeconds,
        @Schema(description = "是否启用邮件通知") boolean mailEnabled
) {
}
