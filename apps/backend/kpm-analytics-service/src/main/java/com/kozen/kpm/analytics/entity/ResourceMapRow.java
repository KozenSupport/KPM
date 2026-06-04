package com.kozen.kpm.analytics.entity;

public class ResourceMapRow {
    private String customerId;
    private String customerName;
    private String region;
    private String address;
    private String level;
    private String status;
    private String salesOwners;
    private String supportOwners;
    private String projects;
    private Long orderedQuantity;

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getSalesOwners() { return salesOwners; }
    public void setSalesOwners(String salesOwners) { this.salesOwners = salesOwners; }
    public String getSupportOwners() { return supportOwners; }
    public void setSupportOwners(String supportOwners) { this.supportOwners = supportOwners; }
    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }
    public Long getOrderedQuantity() { return orderedQuantity; }
    public void setOrderedQuantity(Long orderedQuantity) { this.orderedQuantity = orderedQuantity; }
}
