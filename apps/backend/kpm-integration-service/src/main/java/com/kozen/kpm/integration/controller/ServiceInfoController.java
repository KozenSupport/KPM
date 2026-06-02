package com.kozen.kpm.integration.controller;

import com.kozen.kpm.common.api.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Tag(name = "服务健康检查", description = "服务存活状态检查接口")
@RequestMapping("/api/integrations")
public class ServiceInfoController {
    private final String applicationName;

    public ServiceInfoController(@Value("${spring.application.name}") String applicationName) {
        this.applicationName = applicationName;
    }

    @GetMapping("/ping")
    @Operation(summary = "服务健康检查", description = "返回当前微服务名称和 UP 状态。")
    public ApiResponse<Map<String, String>> ping() {
        return ApiResponse.ok(Map.of(
                "service", applicationName,
                "status", "UP"
        ));
    }
}
