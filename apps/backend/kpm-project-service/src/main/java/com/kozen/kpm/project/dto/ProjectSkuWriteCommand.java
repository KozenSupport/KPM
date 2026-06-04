package com.kozen.kpm.project.dto;

/** Typed persistence command for project SKU changes. */
public record ProjectSkuWriteCommand(String id, String projectId, String wholeMachinePartNumber, String configurationName, String memoryType, Boolean active, String operator) {
    public static ProjectSkuWriteCommand from(String id, String projectId, ProjectSkuRequest request, String operator) {
        return new ProjectSkuWriteCommand(id, projectId, request.wholeMachinePartNumber(), request.configurationName(), request.memoryType(), request.active() == null || request.active(), operator);
    }
}
