package com.kozen.kpm.project.dto;

import java.time.LocalDate;

public record RequirementDto(
        String id,
        String projectId,
        String customerId,
        String customerName,
        String title,
        String userStory,
        String businessValue,
        String acceptance,
        String priority,
        String status,
        String proposer,
        String creator,
        LocalDate createdDate,
        String taskId
) {}
