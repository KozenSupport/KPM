package com.kozen.kpm.resource.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "部门保存请求")
public record DepartmentRequest(
        @NotBlank(message = "部门名称不能为空")
        @Size(max = 40, message = "部门名称不能超过40个字符")
        String name,
        @Size(max = 20, message = "部门状态不能超过20个字符")
        @Pattern(regexp = "ACTIVE|INACTIVE", message = "部门状态只能是ACTIVE或INACTIVE")
        String status
) {
    public String normalizedStatus() { return status == null || status.isBlank() ? BusinessEnumCodes.ACTIVE : status.trim(); }
}
