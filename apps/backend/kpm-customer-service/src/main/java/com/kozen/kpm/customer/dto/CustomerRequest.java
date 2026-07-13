package com.kozen.kpm.customer.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

@Schema(description = "客户保存请求")
public record CustomerRequest(
        @NotBlank(message = "客户名称不能为空")
        @Size(max = 120, message = "客户名称不能超过120个字符")
        String name,
        @NotBlank(message = "客户简称不能为空")
        @Pattern(regexp = "^[A-Za-z]{1,5}$", message = "客户简称必须为1-5个英文字母")
        @Size(max = 5, message = "客户简称不能超过5个字符")
        String shortName,
        @NotBlank(message = "国家/区域不能为空")
        @Size(max = 80, message = "国家/区域不能超过80个字符")
        String region,
        @Size(max = 255, message = "详细地址不能超过255个字符")
        String address,
        @Size(max = 60, message = "客户等级不能超过60个字符")
        @Pattern(regexp = "^$|" + BusinessEnumCodes.CODE_PATTERN, message = "客户等级必须使用枚举Code")
        String level,
        @Size(max = 60, message = "客户状态不能超过60个字符")
        @Pattern(regexp = "^$|" + BusinessEnumCodes.CODE_PATTERN, message = "客户状态必须使用枚举Code")
        String status,
        @Size(max = 30, message = "负责销售不能超过30人")
        List<String> salesOwners,
        @Size(max = 30, message = "负责技术支持不能超过30人")
        List<String> supportOwners
) {
    public List<String> safeSalesOwners() { return salesOwners == null ? List.of() : salesOwners; }
    public List<String> safeSupportOwners() { return supportOwners == null ? List.of() : supportOwners; }
}
