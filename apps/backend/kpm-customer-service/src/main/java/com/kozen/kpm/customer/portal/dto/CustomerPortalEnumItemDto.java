package com.kozen.kpm.customer.portal.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "客户门户可用的业务枚举及其中英文名称")
public record CustomerPortalEnumItemDto(
        @Schema(example = "task_status") String enumType,
        @Schema(example = "IN_PROGRESS") String value,
        @Schema(example = "进行中") String name,
        @Schema(example = "In Progress") String nameEn,
        Integer sortOrder
) {}
