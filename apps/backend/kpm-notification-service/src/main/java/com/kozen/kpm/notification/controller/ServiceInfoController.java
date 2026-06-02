package com.kozen.kpm.notification.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class ServiceInfoController {
    @Value("${kpm.service.code:notification}")
    private String serviceCode;

    @GetMapping("/service-info")
    public Map<String, Object> serviceInfo() {
        return Map.of("service", serviceCode, "status", "UP");
    }
}
