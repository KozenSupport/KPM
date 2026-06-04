package com.kozen.kpm.file.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

@Schema(description = "OSS 配置状态 DTO，不包含敏感密钥")
public record OssStatusResult(
        @Schema(description = "是否启用 OSS") boolean enabled,
        @Schema(description = "配置是否完整可用") boolean ready,
        @Schema(description = "OSS endpoint") String endpoint,
        @Schema(description = "Bucket 名称") String bucket,
        @Schema(description = "根目录前缀") String rootPrefix,
        @Schema(description = "AccessKey 是否已配置") boolean accessKeyConfigured,
        @Schema(description = "下载链接有效期，单位秒") long downloadUrlExpirationSeconds,
        @Schema(description = "业务分类到 OSS 子目录的映射") Map<String, String> categories
) {
}
