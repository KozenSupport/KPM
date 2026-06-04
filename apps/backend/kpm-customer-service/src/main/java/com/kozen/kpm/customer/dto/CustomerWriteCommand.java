package com.kozen.kpm.customer.dto;

/** Typed persistence command for customer base information. */
public record CustomerWriteCommand(String id, String name, String shortName, String region, String address, String level, String status) {
    public static CustomerWriteCommand from(String id, CustomerRequest request, String level, String status) {
        String shortName = request.shortName().trim().toUpperCase();
        return new CustomerWriteCommand(id, request.name(), shortName, request.region(), request.address(), level, status);
    }
}
