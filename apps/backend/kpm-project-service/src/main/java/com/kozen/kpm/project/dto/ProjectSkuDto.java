package com.kozen.kpm.project.dto;

import java.time.LocalDateTime;

public record ProjectSkuDto(String id, String projectId, String wholeMachinePartNumber, String configurationName, String memoryType, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {}
