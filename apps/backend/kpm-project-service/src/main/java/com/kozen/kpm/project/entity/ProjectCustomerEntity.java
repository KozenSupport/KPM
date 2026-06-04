package com.kozen.kpm.project.entity;

/** Persistence projection for projectcustomer data. */
public class ProjectCustomerEntity {
    private String id;
    private String projectStatus;
    private String customerId;
    private String customerName;
    private String region;
    private String level;
    private String customerStatus;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProjectStatus() { return projectStatus; }
    public void setProjectStatus(String projectStatus) { this.projectStatus = projectStatus; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getCustomerStatus() { return customerStatus; }
    public void setCustomerStatus(String customerStatus) { this.customerStatus = customerStatus; }
}
