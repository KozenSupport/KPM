package com.kozen.kpm.project.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectMembersRequest(
        @Valid @Size(max = 200, message = "项目成员不能超过200项") List<ProjectMemberRequest> members,
        @Size(max = 128, message = "项目负责人账号不能超过128个字符") String managerAccount
) {
    public List<ProjectMemberRequest> safeMembers() { return members == null ? List.of() : members; }
}
