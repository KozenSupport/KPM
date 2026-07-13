package com.kozen.kpm.project.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ProjectCustomerStatusRequest(
        @NotBlank(message = "客户项目状态不能为空")
        @Size(max = 60, message = "客户项目状态不能超过60个字符")
        @Pattern(regexp = BusinessEnumCodes.CODE_PATTERN, message = "客户项目状态必须使用枚举Code")
        String projectStatus
) {}
