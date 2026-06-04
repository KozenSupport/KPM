package com.kozen.kpm.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record StageAssigneeRequest(
        @NotBlank(message = "负责人类型不能为空") @Size(max = 20, message = "负责人类型不能超过20个字符") String type,
        @Size(max = 128, message = "负责人名称不能超过128个字符") String name,
        @Size(max = 128, message = "负责人账号不能超过128个字符") String account
) {
}
