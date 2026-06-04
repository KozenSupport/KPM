package com.kozen.kpm.project.dto;

import java.util.List;

public record ProjectCustomerDto(
        String id,
        String projectStatus,
        String customerId,
        String customerName,
        String name,
        String region,
        String level,
        String customerStatus,
        List<RequirementDto> requirements
) {}
