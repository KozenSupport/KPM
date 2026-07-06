package com.kozen.kpm.iam.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "密码修改邮箱验证码发送结果")
public record PasswordCodeResponse(
        @Schema(description = "是否已发送或已生成")
        boolean sent,

        @Schema(description = "验证码有效期，单位秒", example = "600")
        long expiresInSeconds,

        @Schema(description = "用户可读提示")
        String message,

        @Schema(description = "开发环境调试验证码。生产环境不返回。")
        String debugCode
) {}
