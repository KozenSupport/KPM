package com.kozen.kpm.resource.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "枚举值保存请求")
public record EnumItemRequest(
        @NotBlank(message = "枚举类型不能为空")
        @Size(max = 64, message = "枚举类型不能超过64个字符")
        @Pattern(regexp = "^[a-z][a-z0-9_]{1,63}$", message = "枚举类型必须使用小写英文和下划线")
        String enumType,
        @NotBlank(message = "枚举名称不能为空")
        @Size(max = 80, message = "枚举名称不能超过80个字符")
        String name,
        @NotBlank(message = "枚举Code不能为空")
        @Size(max = 64, message = "枚举Code不能超过64个字符")
        @Pattern(regexp = BusinessEnumCodes.CODE_PATTERN, message = "枚举Code必须使用大写英文、数字和下划线")
        String value,
        @NotBlank(message = "英文名称不能为空")
        @Size(max = 80, message = "英文名称不能超过80个字符")
        String nameEn,
        Boolean active,
        Integer sortOrder
) {
    public String normalizedValue() { return value.trim(); }
    public String normalizedNameEn() { return nameEn.trim(); }
    public boolean normalizedActive() { return active == null || active; }
    public int normalizedSortOrder() { return sortOrder == null ? 100 : sortOrder; }
}
