package com.kozen.kpm.project.entity;

import java.time.LocalDate;

/** Persistence projection for requirement data. */
public class RequirementEntity {
    private String id;
    private String projectId;
    private String customerId;
    private String customerName;
    private String title;
    private String userStory;
    private String businessValue;
    private String acceptance;
    private String priority;
    private String status;
    private String proposer;
    private String creator;
    private LocalDate createdDate;
    private String taskId;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getUserStory() { return userStory; }
    public void setUserStory(String userStory) { this.userStory = userStory; }
    public String getBusinessValue() { return businessValue; }
    public void setBusinessValue(String businessValue) { this.businessValue = businessValue; }
    public String getAcceptance() { return acceptance; }
    public void setAcceptance(String acceptance) { this.acceptance = acceptance; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getProposer() { return proposer; }
    public void setProposer(String proposer) { this.proposer = proposer; }
    public String getCreator() { return creator; }
    public void setCreator(String creator) { this.creator = creator; }
    public LocalDate getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
    public String getTaskId() { return taskId; }
    public void setTaskId(String taskId) { this.taskId = taskId; }
}
