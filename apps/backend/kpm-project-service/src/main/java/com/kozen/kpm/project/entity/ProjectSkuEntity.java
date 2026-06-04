package com.kozen.kpm.project.entity;

import java.time.LocalDateTime;

/** Persistence projection for projectsku data. */
public class ProjectSkuEntity {
    private String id;
    private String projectId;
    private String wholeMachinePartNumber;
    private String configurationName;
    private String memoryType;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }
    public String getWholeMachinePartNumber() { return wholeMachinePartNumber; }
    public void setWholeMachinePartNumber(String wholeMachinePartNumber) { this.wholeMachinePartNumber = wholeMachinePartNumber; }
    public String getConfigurationName() { return configurationName; }
    public void setConfigurationName(String configurationName) { this.configurationName = configurationName; }
    public String getMemoryType() { return memoryType; }
    public void setMemoryType(String memoryType) { this.memoryType = memoryType; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
