package com.kozen.kpm.project.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record StageStatusRequest(
        @NotBlank(message = "阶段状态不能为空")
        @Size(max = 40, message = "阶段状态不能超过40个字符")
        @Pattern(regexp = BusinessEnumCodes.CODE_PATTERN, message = "阶段状态必须使用枚举Code")
        String status
) {}
