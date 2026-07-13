package com.kozen.kpm.project.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProcessTemplateRequest(
        @NotBlank(message = "模板名称不能为空") @Size(max = 80, message = "模板名称不能超过80个字符") String name,
        @NotBlank(message = "适用范围不能为空") @Size(max = 120, message = "适用范围不能超过120个字符") String scope,
        @NotBlank(message = "模板状态不能为空") @Size(max = 20, message = "模板状态不能超过20个字符")
        @Pattern(regexp = BusinessEnumCodes.ACTIVE + "|" + BusinessEnumCodes.INACTIVE, message = "模板状态只能是ACTIVE或INACTIVE") String status,
        @Size(max = 80, message = "模板阶段不能超过80项") List<String> stages
) {
    public List<String> safeStages() { return stages == null ? List.of() : stages; }
}
