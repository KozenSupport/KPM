package com.kozen.kpm.customer.converter;

import com.kozen.kpm.customer.dto.CustomerContactDTO;
import com.kozen.kpm.customer.entity.CustomerContactEntity;

import java.util.List;

/**
 * Converts customer contact database entities to frontend DTOs.
 */
public final class CustomerContactConverter {
    private CustomerContactConverter() {
    }

    public static CustomerContactDTO toDto(CustomerContactEntity entity) {
        if (entity == null) return null;
        return new CustomerContactDTO(
                entity.id(),
                entity.customerId(),
                entity.name(),
                entity.title(),
                entity.phone(),
                entity.email(),
                entity.remark()
        );
    }

    public static List<CustomerContactDTO> toDtos(List<CustomerContactEntity> entities) {
        return entities.stream().map(CustomerContactConverter::toDto).toList();
    }
}
