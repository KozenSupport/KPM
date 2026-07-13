package com.kozen.kpm.project.dto;

import com.kozen.kpm.common.util.BusinessEnumCodes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record RequirementRequest(
        @NotBlank(message = "需求标题不能为空") @Size(max = 120, message = "需求标题不能超过120个字符") String title,
        @NotBlank(message = "用户故事不能为空") @Size(max = 1500, message = "用户故事不能超过1500个字符") String userStory,
        @NotBlank(message = "业务价值不能为空") @Size(max = 1000, message = "业务价值不能超过1000个字符") String businessValue,
        @NotBlank(message = "验收标准不能为空") @Size(max = 1500, message = "验收标准不能超过1500个字符") String acceptance,
        @NotBlank(message = "优先级不能为空") @Size(max = 20, message = "优先级不能超过20个字符")
        @Pattern(regexp = BusinessEnumCodes.CODE_PATTERN, message = "优先级必须使用枚举Code") String priority,
        @Size(max = 40, message = "需求状态不能超过40个字符")
        @Pattern(regexp = "^$|" + BusinessEnumCodes.CODE_PATTERN, message = "需求状态必须使用枚举Code") String status,
        @Size(max = 60, message = "提出人不能超过60个字符") String proposer,
        @NotBlank(message = "创建人不能为空") @Size(max = 60, message = "创建人不能超过60个字符") String creator,
        Boolean createTask
) {
}
