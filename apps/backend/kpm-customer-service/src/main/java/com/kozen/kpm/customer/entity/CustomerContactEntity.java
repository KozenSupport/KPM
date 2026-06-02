package com.kozen.kpm.customer.entity;

/**
 * Database entity mapped to kpm_customer_contacts.
 * Keep table entities separate from API DTOs so schema changes do not leak into frontend contracts.
 */
public record CustomerContactEntity(
        String id,
        String customerId,
        String name,
        String title,
        String phone,
        String email,
        String remark
) {
}
