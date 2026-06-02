package com.kozen.kpm.analytics.controller;

import com.kozen.kpm.analytics.service.AnalyticsService;
import com.kozen.kpm.common.api.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(originPatterns = "*")
@Tag(name = "统计看板", description = "订单统计、资源分配、技术支持和客户活跃度")
public class AnalyticsApiController {
    private final AnalyticsService analyticsService;

    public AnalyticsApiController(AnalyticsService analyticsService) { this.analyticsService = analyticsService; }

    @GetMapping("/dashboard")
    @Operation(summary = "工作台统计")
    public ApiResponse<Map<String, Object>> dashboard() { return ApiResponse.ok(analyticsService.dashboard()); }

    @GetMapping("/orders")
    @Operation(summary = "订单统计", description = "支持将订单金额统一换算到目标币种。")
    public ApiResponse<List<Map<String, Object>>> orderStats(@RequestParam(defaultValue = "USD") String targetCurrency) { return ApiResponse.ok(analyticsService.orderStats(targetCurrency)); }

    @GetMapping("/resource-map")
    @Operation(summary = "资源分配情况")
    public ApiResponse<List<Map<String, Object>>> resourceMap() { return ApiResponse.ok(analyticsService.resourceMap()); }

    @GetMapping("/support")
    @Operation(summary = "技术支持情况")
    public ApiResponse<List<Map<String, Object>>> support(@RequestParam(required = false) String customerId) { return ApiResponse.ok(analyticsService.support(customerId)); }

    @GetMapping("/activity")
    @Operation(summary = "客户活跃度")
    public ApiResponse<List<Map<String, Object>>> activity() { return ApiResponse.ok(analyticsService.activity()); }
}
