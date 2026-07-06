package com.kozen.kpm.iam.controller;

import com.kozen.kpm.common.api.ApiResponse;
import com.kozen.kpm.iam.dto.AuthenticatedUserDto;
import com.kozen.kpm.iam.dto.ChangePasswordRequest;
import com.kozen.kpm.iam.dto.LoginResponseDto;
import com.kozen.kpm.iam.dto.LoginRequest;
import com.kozen.kpm.iam.dto.PasswordCodeResponse;
import com.kozen.kpm.iam.dto.ProfileDto;
import com.kozen.kpm.iam.service.IamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/iam")
@CrossOrigin(originPatterns = "*")
@Tag(name = "登录与身份", description = "登录、当前用户和权限聚合接口")
public class IamApiController {
    private final IamService iamService;

    public IamApiController(IamService iamService) { this.iamService = iamService; }

    @PostMapping("/login")
    @Operation(summary = "登录", description = "校验账号密码，返回开发阶段 token 和用户信息。")
    public ApiResponse<LoginResponseDto> login(@Valid @RequestBody LoginRequest request) {
        try {
            return ApiResponse.ok(iamService.login(request));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("INVALID_CREDENTIALS", e.getMessage());
        }
    }

    @GetMapping("/me")
    @Operation(summary = "当前用户", description = "按账号查询用户部门、角色和有效权限。")
    public ApiResponse<AuthenticatedUserDto> me(
            @RequestHeader(value = "X-KPM-Account", required = false) String headerAccount,
            @RequestParam(required = false) String account
    ) {
        try {
            return ApiResponse.ok(iamService.me(headerAccount != null && !headerAccount.isBlank() ? headerAccount : account));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("USER_NOT_FOUND", e.getMessage());
        }
    }

    @GetMapping("/profile")
    @Operation(summary = "个人中心", description = "返回当前用户基础资料、部门、角色和个人工作成果统计。")
    public ApiResponse<ProfileDto> profile(
            @RequestHeader(value = "X-KPM-Account", required = false) String headerAccount,
            @RequestParam(required = false) String account
    ) {
        try {
            return ApiResponse.ok(iamService.profile(headerAccount != null && !headerAccount.isBlank() ? headerAccount : account));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("USER_NOT_FOUND", e.getMessage());
        }
    }

    @PostMapping("/password-code")
    @Operation(summary = "发送修改密码验证码", description = "校验原密码后，将 10 分钟有效的验证码发送到当前登录邮箱。验证码存储在 Redis 中，不落库。")
    public ApiResponse<PasswordCodeResponse> requestPasswordCode(
            @RequestHeader(value = "X-KPM-Account", required = false) String headerAccount,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        ChangePasswordRequest normalizedRequest = headerAccount != null && !headerAccount.isBlank()
                ? request.withAccount(headerAccount)
                : request;
        try {
            return ApiResponse.ok(iamService.requestPasswordCode(normalizedRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("PASSWORD_CODE_FAILED", e.getMessage());
        }
    }

    @PostMapping("/change-password")
    @Operation(summary = "修改当前用户密码", description = "用户输入原密码、新密码和邮箱验证码后修改自己的密码。")
    public ApiResponse<Boolean> changePassword(
            @RequestHeader(value = "X-KPM-Account", required = false) String headerAccount,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        ChangePasswordRequest normalizedRequest = headerAccount != null && !headerAccount.isBlank()
                ? request.withAccount(headerAccount)
                : request;
        try {
            return ApiResponse.ok(iamService.changePassword(normalizedRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("CHANGE_PASSWORD_FAILED", e.getMessage());
        }
    }
}
