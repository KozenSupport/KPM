package com.kozen.kpm.customer.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CustomerDto(
        String id,
        String name,
        String shortName,
        String region,
        String address,
        String level,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<String> salesOwners,
        List<String> supportOwners,
        List<CustomerContactDTO> contacts,
        List<CustomerMaterialDto> materials,
        List<CustomerFollowupDto> followups,
        List<CustomerProjectDto> projects
) {}
