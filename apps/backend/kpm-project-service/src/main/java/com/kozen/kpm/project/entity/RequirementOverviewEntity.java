package com.kozen.kpm.project.entity;

/** Persistence projection for requirementoverview data. */
public class RequirementOverviewEntity {
    private String title;
    private Integer customerCount;
    private String customers;
    private String priority;
    private String statuses;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getCustomerCount() { return customerCount; }
    public void setCustomerCount(Integer customerCount) { this.customerCount = customerCount; }
    public String getCustomers() { return customers; }
    public void setCustomers(String customers) { this.customers = customers; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatuses() { return statuses; }
    public void setStatuses(String statuses) { this.statuses = statuses; }
}
