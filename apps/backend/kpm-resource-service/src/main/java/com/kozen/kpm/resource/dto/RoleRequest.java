package com.kozen.kpm.resource.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

@Schema(description = "角色保存请求")
public record RoleRequest(
        @NotBlank(message = "角色名称不能为空")
        @Size(max = 40, message = "角色名称不能超过40个字符")
        String name,
        @Size(max = 40, message = "角色类型不能超过40个字符")
        @Pattern(regexp = "GLOBAL|PROJECT", message = "角色类型只能是GLOBAL或PROJECT")
        String roleType,
        @Size(max = 20, message = "角色状态不能超过20个字符")
        @Pattern(regexp = "ACTIVE|INACTIVE", message = "角色状态只能是ACTIVE或INACTIVE")
        String status,
        @Size(max = 300, message = "角色权限不能超过300项")
        List<String> permissions
) {
    public String normalizedRoleType() { return roleType == null || roleType.isBlank() ? BusinessEnumCodes.ROLE_TYPE_PROJECT : roleType.trim(); }
    public String normalizedStatus() { return status == null || status.isBlank() ? BusinessEnumCodes.ACTIVE : status.trim(); }
    public List<String> safePermissions() { return permissions == null ? List.of() : permissions; }
}
