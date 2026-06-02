package com.kozen.kpm.customer.dto;

/**
 * Contact data returned to the frontend.
 */
public record CustomerContactDTO(
        String id,
        String customerId,
        String name,
        String title,
        String phone,
        String email,
        String remark
) {
}
