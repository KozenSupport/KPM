package com.kozen.kpm.customer.knowledge.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record KnowledgeArticleStatusRequest(
        @NotBlank(message = "请选择知识库文章状态")
        @Pattern(regexp = "PENDING_REVIEW|PUBLISHED", message = "知识库文章状态Code不正确") String status
) {}
