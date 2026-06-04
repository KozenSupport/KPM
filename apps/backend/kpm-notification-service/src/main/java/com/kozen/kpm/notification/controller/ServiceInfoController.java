package com.kozen.kpm.notification.controller;

import com.kozen.kpm.common.api.ApiResponse;
import com.kozen.kpm.common.dto.ServiceInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "服务健康检查", description = "服务存活状态检查接口")
@RequestMapping("/api/notifications")
public class ServiceInfoController {
    private final String serviceCode;

    public ServiceInfoController(@Value("${kpm.service.code:notification}") String serviceCode) {
        this.serviceCode = serviceCode;
    }

    @GetMapping("/service-info")
    @Operation(summary = "服务信息", description = "返回当前微服务名称和 UP 状态。")
    public ApiResponse<ServiceInfoDto> serviceInfo() {
        return ApiResponse.ok(new ServiceInfoDto(serviceCode, "UP"));
    }
}
