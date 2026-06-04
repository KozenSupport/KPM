package com.kozen.kpm.order.entity;

/** Active SKU projection for order creation and immutable order snapshots. */
public class ProjectSkuEntity {
    private String id;
    private String projectId;
    private String wholeMachinePartNumber;
    private String configurationName;
    private String memoryType;
    private Boolean active;

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
}
