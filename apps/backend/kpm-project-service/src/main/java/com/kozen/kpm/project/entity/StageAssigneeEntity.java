package com.kozen.kpm.project.entity;

/** Persistence projection for stageassignee data. */
public class StageAssigneeEntity {
    private String assigneeType;
    private String assigneeName;
    private String account;
    private String userId;

    public String getAssigneeType() { return assigneeType; }
    public void setAssigneeType(String assigneeType) { this.assigneeType = assigneeType; }
    public String getAssigneeName() { return assigneeName; }
    public void setAssigneeName(String assigneeName) { this.assigneeName = assigneeName; }
    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
